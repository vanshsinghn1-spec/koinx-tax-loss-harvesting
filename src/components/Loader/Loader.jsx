import "./Loader.css";

export function Loader() {
  return (
    <div className="loader" id="loading-state">
      <div className="loader__disclaimer skeleton" />
      <div className="loader__cards">
        <div className="loader__card skeleton" />
        <div className="loader__card skeleton" />
      </div>
      <div className="loader__table">
        <div className="loader__table-header skeleton" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="loader__table-row skeleton" />
        ))}
      </div>
    </div>
  );
}

export function ErrorState({ error, onRetry }) {
  return (
    <div className="error-state" id="error-state">
      <div className="error-state__icon">⚠️</div>
      <h3 className="error-state__title">Something went wrong</h3>
      <p className="error-state__message">
        {error || "Failed to load data. Please try again."}
      </p>
      <button className="error-state__retry" onClick={onRetry} id="retry-btn">
        Try Again
      </button>
    </div>
  );
}
