import { format, parseISO } from "date-fns";

const formatDate = (dateString) => {
  return format(parseISO(dateString), "PP");
};

export default formatDate;
