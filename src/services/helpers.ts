import moment from "moment";

export const parseDate = (dateString: string) => {
  return moment(dateString, "DD-MM-YYYY");
};
