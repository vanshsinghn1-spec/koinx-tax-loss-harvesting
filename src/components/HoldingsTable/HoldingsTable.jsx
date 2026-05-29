import { useState, useMemo } from "react";
import { useHarvesting } from "../../context/HarvestingContext";
import { formatCurrency, formatNumber, getUniqueId, formatHolding } from "../../utils/formatters";
import { getCoinIcon, getCoinFallback } from "../../utils/cryptoIcons";
import "./HoldingsTable.css";

const INITIAL_DISPLAY_COUNT = 8;

function HoldingsTable() {
  const { holdings, selectedHoldings, toggleHolding, toggleAll } = useHarvesting();
  const [showAll, setShowAll] = useState(false);
  const [stcgSortDir, setStcgSortDir] = useState(null); // 'desc' | 'asc' | null

  // Sort logic
  const sortedHoldings = useMemo(() => {
    const list = [...holdings];
    
    if (stcgSortDir === "desc") {
      list.sort((a, b) => b.stcg.gain - a.stcg.gain);
    } else if (stcgSortDir === "asc") {
      list.sort((a, b) => a.stcg.gain - b.stcg.gain);
    } else {
      // Default: absolute total gain descending (most impactful first)
      list.sort((a, b) => {
        const totalA = Math.abs(a.stcg.gain) + Math.abs(a.ltcg.gain);
        const totalB = Math.abs(b.stcg.gain) + Math.abs(b.ltcg.gain);
        return totalB - totalA;
      });
    }
    
    return list;
  }, [holdings, stcgSortDir]);

  const handleStcgSort = () => {
    if (stcgSortDir === null || stcgSortDir === "asc") {
      setStcgSortDir("desc");
    } else {
      setStcgSortDir("asc");
    }
  };

  const displayedHoldings = showAll
    ? sortedHoldings
    : sortedHoldings.slice(0, INITIAL_DISPLAY_COUNT);

  const allSelected =
    holdings.length > 0 &&
    holdings.every((h) => selectedHoldings.has(getUniqueId(h)));

  const someSelected =
    holdings.some((h) => selectedHoldings.has(getUniqueId(h))) && !allSelected;

  const getGainClass = (gain) => {
    if (gain > 0.0001) return "gain-cell__value--profit";
    if (gain < -0.0001) return "gain-cell__value--loss";
    return "gain-cell__value--zero";
  };

  const formatGain = (gain) => {
    if (Math.abs(gain) < 0.01) {
      if (gain === 0) return "₹0.00";
      if (Math.abs(gain) < 0.000001) return gain > 0 ? "< ₹0.01" : "> -₹0.01";
    }
    return formatCurrency(gain);
  };

  return (
    <div className="holdings-section" id="holdings-section">
      <h3 className="holdings-section__title">Holdings</h3>

      <div className="holdings-table-wrapper">
        <table className="holdings-table" id="holdings-table">
          <thead className="holdings-table__head">
            <tr>
              <th>
                <div className="checkbox-cell">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={toggleAll}
                    id="select-all-checkbox"
                    aria-label="Select all holdings"
                  />
                </div>
              </th>
              <th>Asset</th>
              <th>Holdings<span className="th-sublabel">Avg Buy Price</span></th>
              <th>Current Price</th>
              <th>
                <button className="th-sort-btn" onClick={handleStcgSort}>
                  Short-Term
                  <span className={`th-sort-icon ${stcgSortDir ? "th-sort-icon--active" : ""}`}>
                    {stcgSortDir === "asc" ? "↑" : "↓"}
                  </span>
                </button>
              </th>
              <th>Long-Term</th>
              <th>Amount to Sell</th>
            </tr>
          </thead>
          <tbody className="holdings-table__body">
            {displayedHoldings.map((holding) => {
              const id = getUniqueId(holding);
              const isSelected = selectedHoldings.has(id);
              const totalCurrentValue = holding.currentPrice * holding.totalHolding;

              return (
                <tr
                  key={id}
                  className={isSelected ? "row--selected" : ""}
                  onClick={() => toggleHolding(id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <div className="checkbox-cell">
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={isSelected}
                        onChange={() => toggleHolding(id)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select ${holding.coin}`}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="asset-cell">
                      <img
                        className="asset-cell__logo"
                        src={getCoinIcon(holding.coin, holding.logo)}
                        alt={holding.coin}
                        onError={(e) => {
                          e.target.src = getCoinFallback(holding.coin);
                        }}
                      />
                      <div className="asset-cell__info">
                        <span className="asset-cell__ticker">{holding.coin}</span>
                        <span className="asset-cell__name" title={holding.coinName}>
                          {holding.coinName}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="holdings-cell">
                      <span className="holdings-cell__amount">
                        {formatHolding(holding.totalHolding, holding.coin)}
                      </span>
                      <span className="holdings-cell__buy-price">
                        {formatCurrency(holding.averageBuyPrice)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span>{formatCurrency(totalCurrentValue)}</span>
                  </td>
                  <td>
                    <div className="gain-cell">
                      <span className={`gain-cell__value ${getGainClass(holding.stcg.gain)}`}>
                        {formatGain(holding.stcg.gain)}
                      </span>
                      <span className="gain-cell__balance">
                        {formatHolding(holding.stcg.balance, holding.coin)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="gain-cell">
                      <span className={`gain-cell__value ${getGainClass(holding.ltcg.gain)}`}>
                        {formatGain(holding.ltcg.gain)}
                      </span>
                      {holding.ltcg.balance > 0 && (
                        <span className="gain-cell__balance">
                          {formatHolding(holding.ltcg.balance, holding.coin)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    {isSelected ? (
                      <span className="sell-cell">
                        {formatHolding(holding.totalHolding, holding.coin)}
                      </span>
                    ) : (
                      <span className="sell-cell sell-cell--empty">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sortedHoldings.length > INITIAL_DISPLAY_COUNT && (
        <div className="holdings-section__view-all">
          <button
            className="holdings-section__view-all-btn"
            onClick={() => setShowAll(!showAll)}
            id="view-all-btn"
          >
            {showAll ? "Show less" : "View all"}
          </button>
        </div>
      )}
    </div>
  );
}

export default HoldingsTable;
