import { format } from "date-fns";

/**
 * Formats a Date object for the value of a datetime-local input.
 * @param {Date} date The date to format.
 * @returns The formatted date string in the format of: "yyyy-MM-ddTHH:mm".
 */
export default function formatDateForInput(date) {
  return format(date, "yyyy-MM-dd'T'HH:mm");
}
