import { formatCurrency } from "../../utils/formatters";
import "./CapitalGainsCard.css";

function CapitalGainsCard({ variant = "pre", title, stcg, ltcg, savings = 0 }) {
  const isPre = variant === "pre";
  const netStcg = stcg.profits - stcg.losses;
  const netLtcg = ltcg.profits - ltcg.losses;
  const totalGains = netStcg + netLtcg;

  return (
    <div
      className={`gains-card gains-card--${variant}`}
      id={`gains-card-${variant}`}
    >
      <h3 className="gains-card__title">{title}</h3>

      {/* Column Headers */}
      <div className="gains-card__table-header">
        <span className="gains-card__col-label"></span>
        <span className="gains-card__col-label">Short term</span>
        <span className="gains-card__col-label">Long term</span>
      </div>

      {/* Profits Row */}
      <div className="gains-card__row">
        <span className="gains-card__row-label">Profits</span>
        <span className="gains-card__row-value">{formatCurrency(stcg.profits)}</span>
        <span className="gains-card__row-value">{formatCurrency(ltcg.profits)}</span>
      </div>

      {/* Losses Row */}
      <div className="gains-card__row">
        <span className="gains-card__row-label">Losses</span>
        <span className="gains-card__row-value">{formatCurrency(stcg.losses)}</span>
        <span className="gains-card__row-value">{formatCurrency(ltcg.losses)}</span>
      </div>

      {/* Net Capital Gains Row */}
      <div className="gains-card__row">
        <span className="gains-card__row-label">Net Capital Gains</span>
        <span className="gains-card__row-value">{formatCurrency(netStcg)}</span>
        <span className="gains-card__row-value">{formatCurrency(netLtcg)}</span>
      </div>

      <hr className="gains-card__divider" />

      {/* Total */}
      <div className="gains-card__total">
        <span className="gains-card__total-label">
          {isPre ? "Realised Capital Gains:" : "Effective Capital Gains:"}
        </span>
        <span
          className={`gains-card__total-value ${
            totalGains < 0 ? "gains-card__total-value--negative" : ""
          }`}
        >
          {formatCurrency(totalGains)}
        </span>
      </div>

      {/* Savings (only on post card when savings > 0) */}
      {!isPre && savings > 0 && (
        <div className="gains-card__savings" id="savings-banner">
          <span className="gains-card__savings-emoji">🎉</span>
          <span className="gains-card__savings-text">
            You are going to save upto{" "}
            <span className="gains-card__savings-amount">
              {formatCurrency(savings)}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

export default CapitalGainsCard;
