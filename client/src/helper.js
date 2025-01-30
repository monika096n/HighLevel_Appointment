import moment from "moment-timezone";
const formatAppointmentTime = (utcDateString) => {
  const timeZone = "Asia/Kolkata"; 
  const startMoment = moment.utc(utcDateString).tz(timeZone, true);
  const endMoment = startMoment.clone().add(30, "minutes");

  const formattedTime = `${startMoment.format("hh:mm A")} - ${endMoment.format("hh:mm A")}`;
  const formattedDate = startMoment.format("ddd, MMM DD, YYYY");

  return `${formattedTime}, ${formattedDate}`;
};

export default formatAppointmentTime;
