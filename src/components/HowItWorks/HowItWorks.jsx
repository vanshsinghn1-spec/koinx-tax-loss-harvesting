import { useState, useRef, useEffect } from "react";
import "./HowItWorks.css";

const steps = [
  "See your capital gains for FY 2024-25 in the left card",
  "Check boxes for assets you plan on selling to reduce your tax liability",
  "Instantly see your updated tax liability in the right card",
];

function HowItWorks() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="how-it-works" ref={popoverRef} id="how-it-works">
      <button
        className="how-it-works__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        id="how-it-works-trigger"
      >
        How it works?
      </button>

      {isOpen && <div className="how-it-works__backdrop" onClick={() => setIsOpen(false)} />}

      <div className={`how-it-works__popover ${isOpen ? "how-it-works__popover--open" : ""}`}>
        <ul className="how-it-works__list">
          {steps.map((step, index) => (
            <li key={index} className="how-it-works__list-item">
              <span className="how-it-works__bullet">●</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>

        <div className="how-it-works__pro-tip">
          <div className="how-it-works__pro-tip-label">Pro tip:</div>
          <div className="how-it-works__pro-tip-text">
            Experiment with different combinations of your holdings to optimize
            your tax liability
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
