/**
 * ## phone
 * Formatted phone regexp with +7 country code
 * 
 * ```ts
 * const valid = phone.test('+7 (999) 750-66-23') // true
 * const invalid = phone.test('789123013788') // false
 * ```
 */
export const phone = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/