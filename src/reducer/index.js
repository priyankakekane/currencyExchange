export const QUOTE_EXPIRY_SECONDS = 30;

export const initialState = {
  step: 1,
  currencies: {},
  sourceCurrency: 'USD',
  destinationCurrency: 'EUR',
  amount: 100,
  quote: null,
  timeLeft: 0,
  loading: false,
  error: null,
  transactionId: null,
  transactionStatus: null,
};

export default function reducer(state, action) {
  switch (action.type) {
    case 'BOOTSTRAP':
      return { ...state, currencies: action.payload };
    case 'START_LOAD':
      return { ...state, loading: true, error: null };
    case 'SET_QUOTE':
      return { ...state, quote: action.payload, timeLeft: 30, loading: false };
    case 'UPDATE_TIMER':
      return { ...state, timeLeft: Math.max(0, state.timeLeft - 1) };
    case 'PAY_SUCCESS':
      return {
        ...state,
        transactionId: action.payload,
        transactionStatus: 'Processing',
        step: 3,
        loading: false,
      };
    case 'SET_STATUS':
      return { ...state, transactionStatus: action.payload };
    case 'GO_TO_CONFIRM':
      return { ...state, step: 2 };
    case 'GO_BACK':
      return { ...state, step: 1, quote: null, timeLeft: 0 };
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value, quote: null, error: null };
    case 'ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'RESET':
      return { ...initialState, currencies: state.currencies };
    default:
      return state;
  }
}
