/**
 * ## email
 * 99% effective email regexp
 * 
 * ```ts
 * const valid = email.test('johndoe@gmail.com') // true
 * const invalid = email.test('notanemail') // false
 * ```
 */
export const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 