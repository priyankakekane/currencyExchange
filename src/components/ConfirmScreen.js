const ConfirmScreen = ({ state, onPay, styles, onBack }) => {
  const { quote, sourceCurrency, amount, loading } = state;

  return (
    <div style={{ textAlign: 'center', animation: 'fadeIn 0.3s ease-in' }}>
      <h2 style={{ marginBottom: '8px' }}>Review Transfer</h2>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
        Please confirm the details below
      </p>

      <div
        style={{
          ...styles.card,
          textAlign: 'left',
          marginBottom: '24px',
          border: '1px solid #e0e7ff',
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <span style={styles.label}>You send</span>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {amount} {sourceCurrency}
          </div>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <span style={styles.label}>Recipient receives</span>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0070f3' }}>
            {quote?.total} {state.destinationCurrency}
          </div>
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#666',
            paddingTop: '10px',
            borderTop: '1px solid #eee',
          }}
        >
          Exchange Rate: 1 {sourceCurrency} = {quote?.rate} {state.destinationCurrency}
        </div>
      </div>

      <button
        style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
        onClick={onPay}
        disabled={loading}
      >
        {loading ? 'Authorizing...' : 'Confirm and Pay'}
      </button>

      <button
        style={{
          ...styles.button,
          backgroundColor: 'transparent',
          color: '#666',
          marginTop: '10px',
        }}
        onClick={onBack}
        disabled={loading}
      >
        Back to Edit
      </button>
    </div>
  );
};

export default ConfirmScreen;
