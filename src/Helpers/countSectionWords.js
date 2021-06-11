import countWords from "./countWords";

/**
 * Returns the number of words a section has including it's title.
 * @param {Section} section The section to count words for.
 * @returns The total number of words.
 */
export default function countSectionWords(section) {
  return countWords(section.title) + section.wordcount;
}
