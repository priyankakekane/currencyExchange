import '../App.css';
const QuoteScreen = ({ state, dispatch, onGetQuote, styles }) => {
  const isExpired = state.timeLeft === 0 && state.quote;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <label style={styles.label}>Amount</label>
      <input
        type="number"
        style={styles.input}
        value={state.amount}
        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'amount', value: e.target.value })}
      />

      <div style={{ display: 'flex', gap: '10px' }}>
        <select
          style={styles.select}
          value={state.sourceCurrency}
          onChange={(e) =>
            dispatch({ type: 'UPDATE_FIELD', field: 'sourceCurrency', value: e.target.value })
          }
        >
          {Object.keys(state.currencies).map((option) => (
            <option key={option} value={option}>
              {`${option}[${state.currencies[option].symbol}]`}
            </option>
          ))}
        </select>
        <select
          style={styles.select}
          value={state.destinationCurrency}
          onChange={(e) =>
            dispatch({ type: 'UPDATE_FIELD', field: 'destinationCurrency', value: e.target.value })
          }
        >
          {Object.keys(state.currencies).map((option) => (
            <option key={option} value={option}>
              {`${option}[${state.currencies[option].symbol}]`}
            </option>
          ))}
        </select>
      </div>

      {!state.quote || state.loading ? (
        <button style={styles.button} onClick={onGetQuote} disabled={state.loading}>
          {state.loading ? 'Fetching...' : 'Get Quote'}
        </button>
      ) : (
        <div style={styles.card}>
          <table>
            <tbody>
              <tr>
                <td>Rate :</td>
                <td>{state.quote.rate}</td>
              </tr>
              <tr>
                <td>Platform Fees :</td>
                <td>{state.quote.fee}</td>
              </tr>
              <tr>
                <td>Total Payment :</td>
                <td>{state.quote.total}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ display: 'flex', gap: '10px' }}>
            {' '}
            <button
              style={{ ...styles.button, ...(isExpired ? styles.buttonDisabled : {}) }}
              disabled={isExpired}
              onClick={() => dispatch({ type: 'GO_TO_CONFIRM' })}
            >
              Continue{' '}
              {state.timeLeft > 0 && (
                <span>
                  Expiry:{' '}
                  <span key={state.timeLeft} className="timer-pulse">
                    {state.timeLeft}s
                  </span>
                </span>
              )}
            </button>
            <button
              style={{
                ...styles.invertButton,
              }}
              onClick={onGetQuote}
            >
              Refresh Quote
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteScreen;
