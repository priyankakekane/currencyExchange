const ConfirmScreen = ({ state, onPay, styles, onBack }) => {
  const { quote, sourceCurrency, destinationCurrency, amount, loading } = state;

  const formatCurrency = (val, currency) => {
    if (!val) return '---';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  if (!quote) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>Session expired. Please start over.</p>
        <button style={styles.button} onClick={onBack}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <header style={{ marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '8px' }}>Review Transfer</h2>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Verify the details before authorizing payment.
        </p>
      </header>

      <div
        style={{
          ...styles.card,
          textAlign: 'left',
          marginBottom: '24px',
          border: '1px solid #e0e7ff',
          backgroundColor: '#f9faff',
        }}
      >
        <div style={detailRow}>
          <span style={styles.label}>You send</span>
          <div style={amountText}>
            {formatCurrency(amount, sourceCurrency)}{' '}
            <small style={currencyCode}>{sourceCurrency}</small>
          </div>
        </div>

        <div style={arrowDivider}>↓</div>

        <div style={detailRow}>
          <span style={styles.label}>Recipient receives</span>
          <div style={{ ...amountText, color: '#0070f3' }}>
            {formatCurrency(quote.total, destinationCurrency)}{' '}
            <small style={currencyCode}>{destinationCurrency}</small>
          </div>
        </div>

        <div style={exchangeRateBox}>
          <span>Exchange Rate:</span>
          <strong>
            1 {sourceCurrency} = {quote.rate} {destinationCurrency}
          </strong>
        </div>
      </div>

      <button
        style={{
          ...styles.button,
          cursor: loading ? 'not-allowed' : 'pointer',
          filter: loading ? 'grayscale(0.5)' : 'none',
        }}
        onClick={onPay}
        disabled={loading}
      >
        {loading ? 'Processing Transaction...' : 'Confirm & Pay Now'}
      </button>

      <button
        style={{
          ...styles.button,
          backgroundColor: 'transparent',
          color: '#666',
          marginTop: '12px',
          border: 'none',
        }}
        onClick={onBack}
        disabled={loading}
      >
        Back to Edit
      </button>
    </div>
  );
};

const detailRow = { marginBottom: '16px' };
const amountText = { fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' };
const currencyCode = { fontSize: '14px', color: '#666', fontWeight: '400' };
const arrowDivider = {
  paddingLeft: '4px',
  color: '#0070f3',
  fontSize: '18px',
  marginBottom: '16px',
};
const exchangeRateBox = {
  fontSize: '12px',
  color: '#444',
  padding: '12px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  border: '1px solid #edf2f7',
  display: 'flex',
  justifyContent: 'space-between',
};

export default ConfirmScreen;
