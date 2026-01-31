import { useMemo } from 'react';
import * as actions from '../constants/actionTypes';
import '../App.css';

const QuoteScreen = ({ state, dispatch, onGetQuote, styles }) => {
  const { timeLeft, quote, loading, amount, sourceCurrency, destinationCurrency, currencies } =
    state;

  const isExpired = useMemo(() => timeLeft === 0 && quote, [timeLeft, quote]);
  const currencyKeys = useMemo(() => Object.keys(currencies), [currencies]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || parseFloat(value) >= 0) {
      dispatch({ type: actions.UPDATE_FIELD, field: 'amount', value });
    }
  };

  const handleSwapCurrencies = () => {
    //Added a swap button between selects for better UX
    dispatch({ type: actions.UPDATE_FIELD, field: 'sourceCurrency', value: destinationCurrency });
    dispatch({ type: actions.UPDATE_FIELD, field: 'destinationCurrency', value: sourceCurrency });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h3 className="quote-header">Currency Exchange</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={styles.label}>Amount to Send</label>
        <input
          type="number"
          min="0"
          style={styles.input}
          value={amount}
          placeholder="0.00"
          onChange={handleAmountChange}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {/* Source Currency */}
        <select
          style={styles.select}
          value={sourceCurrency}
          onChange={(e) =>
            dispatch({ type: actions.UPDATE_FIELD, field: 'sourceCurrency', value: e.target.value })
          }
        >
          {currencyKeys.map((code) => (
            <option key={code} value={code}>{`${code} [${currencies[code].symbol}]`}</option>
          ))}
        </select>

        <button
          onClick={handleSwapCurrencies}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          ⇄
        </button>

        <select
          style={styles.select}
          value={destinationCurrency}
          onChange={(e) =>
            dispatch({
              type: actions.UPDATE_FIELD,
              field: 'destinationCurrency',
              value: e.target.value,
            })
          }
        >
          {currencyKeys.map((code) => (
            <option key={code} value={code} disabled={code === sourceCurrency}>
              {`${code} [${currencies[code].symbol}]`}
            </option>
          ))}
        </select>
      </div>

      {!quote || loading ? (
        <button
          style={styles.button}
          onClick={onGetQuote}
          disabled={loading || !amount || amount <= 0}
        >
          {loading ? 'Calculating Best Rate...' : 'Get Quote'}
        </button>
      ) : (
        <div style={styles.card} className={loading ? 'loading-fade' : ''}>
          <div style={{ marginBottom: '15px' }}>
            <div className="rowStyle">
              <span>Rate</span> <strong>{quote.rate}</strong>
            </div>
            <div className="rowStyle">
              <span>Platform Fees</span> <strong>{quote.fee}</strong>
            </div>
            <div
              className="rowStyle"
              style={{
                borderTop: '1px solid #eee',
                paddingTop: '8px',
                marginTop: '8px',
              }}
            >
              <span>Total Payment</span> <strong>{quote.total}</strong>
            </div>
          </div>

          <button
            style={{ ...styles.button, ...(isExpired ? styles.buttonDisabled : {}) }}
            disabled={isExpired}
            onClick={() => dispatch({ type: actions.GO_TO_CONFIRM })}
          >
            {isExpired ? 'Quote Expired' : 'Continue to Transfer'}
            {!isExpired && timeLeft > 0 && (
              <span style={{ marginLeft: '8px', opacity: 0.8, fontSize: '12px' }}>
                ({timeLeft}s)
              </span>
            )}
          </button>

          <button style={styles.invertButton} onClick={onGetQuote}>
            Refresh Quote
          </button>
        </div>
      )}
    </div>
  );
};

export default QuoteScreen;
