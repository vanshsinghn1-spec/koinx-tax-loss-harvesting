/**
 * Mapping of coin tickers to reliable cryptocurrency icon URLs
 * Uses cryptocurrency-icons CDN as primary, CoinGecko as fallback
 */
const CRYPTO_ICONS = {
  BTC: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  ETH: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  USDT: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
  USDC: "https://assets.coingecko.com/coins/images/6319/large/usdc.png",
  SOL: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
  MATIC: "https://assets.coingecko.com/coins/images/4713/large/polygon.png",
  LINK: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
  WETH: "https://assets.coingecko.com/coins/images/2518/large/weth.png",
  FTM: "https://assets.coingecko.com/coins/images/4001/large/Fantom_round.png",
  QUICK: "https://assets.coingecko.com/coins/images/13970/large/quick.png",
  DFYN: "https://assets.coingecko.com/coins/images/15368/large/SgqhfWz4_400x400_%281%29.jpg",
  BLOK: "https://assets.coingecko.com/coins/images/18819/large/logo-bholdus-6.png",
  TRADE: "https://assets.coingecko.com/coins/images/16416/large/Logo_colored_200.png",
  FLAME: "https://assets.coingecko.com/coins/images/17359/large/WhiteOnBlack_Primary_Logo.png",
  OX: "https://assets.coingecko.com/coins/images/35365/large/logo.png",
  PIG: "https://assets.coingecko.com/coins/images/35425/large/pigcoin_200.png",
  FRM: "https://assets.coingecko.com/coins/images/8251/large/FRM.png",
};

// SVG data URIs for common coins when CDN fails
const COIN_COLORS = {
  BTC: "#F7931A",
  ETH: "#627EEA",
  USDT: "#26A17B",
  USDC: "#2775CA",
  SOL: "#9945FF",
  MATIC: "#8247E5",
  LINK: "#2A5ADA",
  WETH: "#627EEA",
  FTM: "#1969FF",
  WPOL: "#8247E5",
  GONE: "#FF4444",
  SLN: "#00D4FF",
  EZ: "#5C6BC0",
  TITAN: "#1A1A2E",
  SPHERE: "#8B5CF6",
  WELT: "#FF6B35",
  QUICK: "#418ACA",
  DFYN: "#E84142",
  BLOK: "#00BFFF",
  TRADE: "#1E88E5",
  FLAME: "#FF4500",
  OX: "#00C853",
  PIG: "#FF69B4",
  "$CULO": "#FFD700",
  FRM: "#DA4567",
};

/**
 * Generate an inline SVG data URI for a coin when no icon is available
 */
function generateCoinSvg(ticker) {
  const color = COIN_COLORS[ticker] || "#6366F1";
  const displayText = ticker.replace("$", "").substring(0, 2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="${color}"/><text x="32" y="38" text-anchor="middle" fill="white" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="22">${displayText}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Get the best available icon URL for a coin
 * @param {string} ticker - Coin ticker symbol
 * @param {string} originalUrl - Original URL from the API
 * @returns {string} Icon URL
 */
export function getCoinIcon(ticker, originalUrl) {
  // If it's the DefaultCoin placeholder, use our mapping instead
  if (
    !originalUrl ||
    originalUrl.includes("DefaultCoin") ||
    originalUrl.includes("placeholder")
  ) {
    return CRYPTO_ICONS[ticker] || generateCoinSvg(ticker);
  }

  return originalUrl;
}

/**
 * Get the fallback icon when the primary fails to load
 * @param {string} ticker
 * @returns {string}
 */
export function getCoinFallback(ticker) {
  return generateCoinSvg(ticker);
}
