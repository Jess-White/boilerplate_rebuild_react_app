/**
 * Removes duplicate elements from an array.
 */
export default function unique(array) {
  return [...new Set(array)];
}
