import "./Header.css";

function Header() {
  return (
    <header className="header" id="header">
      <div className="header__logo">
        <svg
          className="header__logo-icon"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="6" fill="#F5C518" />
          <path
            d="M8 8h5v6.5L18.5 8H24l-7 8.5L24 24h-5.5L13 17v7H8V8z"
            fill="#0D1421"
          />
        </svg>
        <span className="header__logo-text">
          Koin<span className="header__logo-accent">X</span>
          <sup style={{ fontSize: "10px", color: "#6f7a8b", marginLeft: "2px" }}>
            TM
          </sup>
        </span>
      </div>
    </header>
  );
}

export default Header;
