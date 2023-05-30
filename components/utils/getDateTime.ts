import moment from "moment";

const getDateTime = (date: Date) => {
  const formattedDateTime = moment(date).format("MMMM Do, YYYY, h:mm:ss A");
  return formattedDateTime;
};

export default getDateTime;
