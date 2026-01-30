import React, { createContext, useContext, useReducer, useEffect } from 'react';
import reducer, { initialState } from '../reducer/index';
import { mockApi } from '../mocks/api';

const TransferContext = createContext();

export const TransferProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load currencies on mount
  useEffect(() => {
    mockApi.getCurrencies().then((res) => dispatch({ type: 'BOOTSTRAP', payload: res }));
  }, []);

  // Timer Effect
  useEffect(() => {
    if (state.step === 1 && state.quote && state.timeLeft > 0) {
      const timer = setInterval(() => dispatch({ type: 'UPDATE_TIMER' }), 1000);
      return () => clearInterval(timer);
    }
  }, [state.step, state.quote, state.timeLeft]);

  // Polling Effect
  useEffect(() => {
    const isTerminal = ['Settled', 'Failed'].includes(state.transactionStatus);
    if (state.step === 3 && state.transactionId && !isTerminal) {
      const poll = setInterval(async () => {
        try {
          const status = await mockApi.fetchStatus(state.transactionId);
          dispatch({ type: 'SET_STATUS', payload: status });
        } catch (e) {
          console.error('Polling error', e);
        }
      }, 3000);
      return () => clearInterval(poll);
    }
  }, [state.step, state.transactionId, state.transactionStatus]);

  const actions = {
    getQuote: async () => {
      dispatch({ type: 'START_LOAD' });
      try {
        const q = await mockApi.getQuote({
          amount: state.amount,
          source: state.sourceCurrency,
          dest: state.destinationCurrency,
        });
        dispatch({ type: 'SET_QUOTE', payload: q });
      } catch (e) {
        dispatch({ type: 'ERROR', payload: 'Failed to fetch quote' });
      }
    },
    executePayment: async () => {
      if (state.loading) return;
      dispatch({ type: 'START_LOAD' });
      try {
        const res = await mockApi.pay(state.quote.id);
        dispatch({ type: 'PAY_SUCCESS', payload: res.txnId });
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e.message });
      }
    },
    reset: async () => {
      if (state.loading) return;
      dispatch({ type: 'START_LOAD' });
      try {
        dispatch({ type: 'RESET', payload: '' });
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e.message });
      }
    },
    goBack: async () => {
      try {
        dispatch({ type: 'GO_BACK', payload: '' });
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e.message });
      }
    },
  };

  return (
    <TransferContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </TransferContext.Provider>
  );
};

export const useTransfer = () => useContext(TransferContext);
