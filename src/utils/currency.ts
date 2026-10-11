/**
 * Currency and monetary calculation helpers
 * Uses integer arithmetic in paise to prevent floating point inaccuracies.
 */

export const UNIT_PRICE_PAISE = 100000; // ₹1,000.00
export const UNIT_PRICE_INR = 1000;

/**
 * Format paise into Indian Rupee display (e.g. ₹1,000)
 */
export function formatPaiseToINR(paise: number): string {
  const inr = Math.floor(paise / 100);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inr);
}

/**
 * Format standard INR number (e.g. 1000 -> "₹1,000")
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate total price in paise for a given quantity
 */
export function calculateTotalPaise(quantity: number): number {
  return Math.max(0, quantity) * UNIT_PRICE_PAISE;
}
