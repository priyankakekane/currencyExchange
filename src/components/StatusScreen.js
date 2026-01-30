const StatusScreen = ({ state, styles, onReset }) => {
  const { transactionStatus, transactionId } = state;

  // Map status to progress percentage
  const getProgress = () => {
    switch (transactionStatus) {
      case 'Processing':
        return '33%';
      case 'Sent':
        return '66%';
      case 'Settled':
        return '100%';
      case 'Failed':
        return '100%';
      default:
        return '0%';
    }
  };

  const isComplete = transactionStatus === 'Settled' || transactionStatus === 'Failed';

  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>
        {transactionStatus === 'Settled' ? '✅' : transactionStatus === 'Failed' ? '❌' : '⏳'}
      </div>

      <h2 style={{ marginBottom: '8px' }}>{transactionStatus}</h2>
      <p style={{ color: '#666', fontSize: '13px', marginBottom: '24px' }}>
        Transaction ID:{' '}
        <code style={{ background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>
          {transactionId}
        </code>
      </p>

      {/* Progress Tracker */}
      <div style={{ ...styles.progressBar, marginBottom: '8px' }}>
        <div
          style={{
            ...styles.progressFill(getProgress()),
            backgroundColor: transactionStatus === 'Failed' ? '#ff4d4d' : '#0070f3',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '10px',
          color: '#999',
          fontWeight: 'bold',
        }}
      >
        <span>INITIALIZED</span>
        <span>PARTNER MATCH</span>
        <span>SETTLED</span>
      </div>

      {isComplete && (
        <button
          style={{ ...styles.button, marginTop: '32px', backgroundColor: '#333' }}
          onClick={onReset}
        >
          Make Another Transfer
        </button>
      )}
    </div>
  );
};

export default StatusScreen;
