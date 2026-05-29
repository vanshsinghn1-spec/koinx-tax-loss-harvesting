/**
 * Format a number as Indian Rupee currency
 * @param {number} value
 * @returns {string}
 */
export const formatCurrency = (value) => {
  if (value === undefined || value === null || isNaN(value)) return "₹0.00";

  const absValue = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  // Use Indian locale formatting
  const formatted = absValue.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${sign}₹${formatted}`;
};

/**
 * Format a number with appropriate decimal places
 * @param {number} value
 * @param {number} maxDecimals
 * @returns {string}
 */
export const formatNumber = (value, maxDecimals = 6) => {
  if (value === undefined || value === null || isNaN(value)) return "0";

  // For very small numbers, use scientific notation
  if (Math.abs(value) > 0 && Math.abs(value) < 0.000001) {
    return value.toExponential(2);
  }

  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  });
};

/**
 * Generate a unique ID for a holding
 * @param {object} holding
 * @returns {string}
 */
export const getUniqueId = (holding) => {
  return `${holding.coin}-${holding.coinName}`;
};

/**
 * Format holding amount with coin ticker
 * @param {number} amount
 * @param {string} coin
 * @returns {string}
 */
export const formatHolding = (amount, coin) => {
  if (Math.abs(amount) < 0.000001 && amount !== 0) {
    return `${amount.toExponential(2)} ${coin}`;
  }
  return `${formatNumber(amount, 8)} ${coin}`;
};
