/**
 * Replaces incorrectly capitalised ISBN in the given message.
 * @param {String} message The message to be formatted.
 */
export function replaceISBNSubstrings(message) {
  message.replace('Isbn', 'ISBN').replace('isbn', 'ISBN');
}
