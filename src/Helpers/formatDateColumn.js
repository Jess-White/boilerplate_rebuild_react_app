import { format as formatDate, parseISO } from "date-fns";

export default function formatDateColumn(dateString) {
  return formatDate(parseISO(dateString), "PP");
}
