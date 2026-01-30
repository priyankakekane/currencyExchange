import QuoteScreen from './components/QuoteScreen';
import ConfirmScreen from './components/ConfirmScreen';
import StatusScreen from './components/StatusScreen';
import { TransferProvider, useTransfer } from './context/TransferContext';

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '12px',
  },
  label: { fontSize: '12px', fontWeight: 'bold', color: '#666' },
  input: {
    padding: '10px',
    margin: '5px 0 15px',
    borderRadius: '6px',
    border: '1px solid #ddd',
  },
  select: { flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ddd' },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  invertButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'white',
    color: '#0070f3',
    border: '1px solid #0070f3',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  buttonDisabled: { backgroundColor: '#ccc' },
  card: { padding: '15px', background: '#f9f9f9', borderRadius: '8px' },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: (width) => ({
    width,
    height: '100%',
    transition: 'width 0.5s ease-in-out',
  }),
};
const CuurencyExchangeOrchestrator = () => {
  const { state, actions, dispatch } = useTransfer();
  return (
    <div style={styles.container}>
      {state.error && <div style={{ color: 'red' }}>{state.error}</div>}

      {state.step === 1 && (
        <QuoteScreen
          state={state}
          dispatch={dispatch}
          onGetQuote={actions.getQuote}
          styles={styles}
        />
      )}

      {state.step === 2 && (
        <ConfirmScreen
          state={state}
          onPay={actions.executePayment}
          onBack={actions.goBack}
          styles={styles}
        />
      )}

      {state.step === 3 && <StatusScreen state={state} onReset={actions.reset} styles={styles} />}
    </div>
  );
};

export default function App() {
  return (
    <TransferProvider>
      <CuurencyExchangeOrchestrator className="App" />
    </TransferProvider>
  );
}
