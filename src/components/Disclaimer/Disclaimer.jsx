import { useState } from "react";
import "./Disclaimer.css";

const disclaimerNotes = [
  "Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.",
  "Tax harvesting does not apply to derivatives or futures. These are handled as business income and are outside the scope of this tool.",
  "Price and market value data is fetched from CoinGecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.",
  "Some assets may be valued at zero due to the absence of market data, while still contributing to your holdings.",
  "Only realised losses are considered for harvesting. Unrealised losses in held assets are not included.",
];

function Disclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="disclaimer" id="disclaimer-section">
      <button
        className="disclaimer__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        id="disclaimer-toggle"
      >
        <span className="disclaimer__toggle-left">
          <span className="disclaimer__icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
          Important Notes & Disclaimers
        </span>
        <span className={`disclaimer__chevron ${isOpen ? "disclaimer__chevron--open" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <div className={`disclaimer__content ${isOpen ? "disclaimer__content--open" : ""}`}>
        <ul className="disclaimer__list">
          {disclaimerNotes.map((note, index) => (
            <li key={index} className="disclaimer__list-item">
              <span className="disclaimer__bullet">●</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Disclaimer;
