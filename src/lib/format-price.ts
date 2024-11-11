export function formatPrice(price: number): string {
  if (!price) return '$0.00'
  return price < 0.01 
    ? `$${price.toFixed(8)}` 
    : `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatPriceChange(change: number) {
  if (typeof change !== 'number' || isNaN(change)) {
    return '+0.00%';
  }
  const prefix = change >= 0 ? '+' : '';
  return `${prefix}${change.toFixed(2)}%`;
} 