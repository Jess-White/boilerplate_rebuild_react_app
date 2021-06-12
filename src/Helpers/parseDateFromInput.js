import { parse } from "date-fns";

/**
 * Parses a date string from datetime-local input to Date object.
 * @param {string} dateString Date string to parse in the format of: "yyyy-MM-ddTHH:mm".
 * @returns The parsed Date object.
 */
export default function parseDateFromInput(dateString) {
  return parse(dateString, "yyyy-MM-dd'T'HH:mm", new Date());
}
