import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import reducer, { initialState } from '../reducer/index';
import { mockApi } from '../mocks/api';
import * as actionType from '../constants/actionTypes';

const TransferContext = createContext();

export const TransferProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load currencies on mount
  useEffect(() => {
    mockApi
      .getCurrencies()
      .then((res) => dispatch({ type: actionType.INITIAL_LOAD, payload: res }));
  }, []);

  // Timer Effect
  useEffect(() => {
    if (state.step === 1 && state.quote && state.timeLeft > 0) {
      const timer = setInterval(() => dispatch({ type: actionType.UPDATE_TIMER }), 1000);
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
          dispatch({ type: actionType.SET_STATUS, payload: status });
        } catch (e) {
          console.error('Polling error', e);
        }
      }, 3000);
      return () => clearInterval(poll);
    }
  }, [state.step, state.transactionId, state.transactionStatus]);

  const actions = useMemo(
    () => ({
      getQuote: async () => {
        dispatch({ type: actionType.START_LOAD });
        try {
          const q = await mockApi.getQuote({
            amount: state.amount,
            source: state.sourceCurrency,
            dest: state.destinationCurrency,
          });
          dispatch({ type: actionType.SET_QUOTE, payload: q });
        } catch (e) {
          dispatch({ type: actionType.ERROR, payload: 'Failed to fetch quote' });
        }
      },
      executePayment: async () => {
        if (state.loading) return;
        dispatch({ type: actionType.START_LOAD });
        try {
          const res = await mockApi.pay(state.quote.id);
          dispatch({ type: actionType.PAY_SUCCESS, payload: res.txnId });
        } catch (e) {
          dispatch({ type: actionType.ERROR, payload: e.message });
        }
      },
      reset: async () => {
        if (state.loading) return;
        dispatch({ type: actionType.START_LOAD });
        try {
          dispatch({ type: actionType.RESET, payload: '' });
        } catch (e) {
          dispatch({ type: actionType.ERROR, payload: e.message });
        }
      },
      goBack: async () => {
        try {
          dispatch({ type: actionType.GO_BACK, payload: '' });
        } catch (e) {
          dispatch({ type: actionType.ERROR, payload: e.message });
        }
      },
    }),
    [state.amount, state.sourceCurrency, state.destinationCurrency, state.loading, state.quote]
  );

  return (
    <TransferContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </TransferContext.Provider>
  );
};

export const useTransfer = () => useContext(TransferContext);
