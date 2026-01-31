import { useMemo } from 'react';

const STATUS_CONFIG = {
  Processing: { progress: '33%', icon: '⏳', color: '#0070f3' },
  Sent: { progress: '66%', icon: '⏳', color: '#0070f3' },
  Settled: { progress: '100%', icon: '✅', color: '#0070f3' },
  Failed: { progress: '100%', icon: '❌', color: '#ff4d4d' },
  default: { progress: '0%', icon: '⏳', color: '#0070f3' },
};

const StatusScreen = ({ state, styles, onReset }) => {
  const { transactionStatus, transactionId } = state;

  // 2. Derive configuration based on status
  const config = STATUS_CONFIG[transactionStatus] || STATUS_CONFIG.default;
  const isComplete = ['Settled', 'Failed'].includes(transactionStatus);

  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      {/* Accessibility: Use aria-label for emojis */}
      <div
        role="img"
        aria-label={transactionStatus}
        style={{ fontSize: '48px', marginBottom: '16px' }}
      >
        {config.icon}
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
            ...styles.progressFill(config.progress),
            backgroundColor: config.color,
            transition: 'width 0.3s ease-in-out', // Added for smoother UX
          }}
        />
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
