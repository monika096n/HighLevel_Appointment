const moment = require("moment");

function formatDateToCustomString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

const generateSlots = (date, start, end, duration, timezone) => {
  const slots = [];
  const startTime = moment.tz(`${date}T${start}`, timezone).tz("Asia/Kolkata");
  const endTime = moment.tz(`${date}T${end}`, timezone).tz("Asia/Kolkata");

  while (startTime.isBefore(endTime)) {
    slots.push(startTime.toDate()); 
    startTime.add(duration, "minutes");
  }

  return slots;
};

const isSlotAvailable = (slot, events) => {
  return !events.some((event) => {
    const eventStart = moment(event.startTime);
    const eventEnd = moment(event.endTime);
    return moment(slot).isBetween(eventStart, eventEnd, "minute", "[)");
  });
};


function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).toString();
  return `${year}-${month}-${day}`;
}

function formatTime(date) {
  const d = new Date(date);
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
}

function groupEventsByDate(events) {
  return events.reduce((acc, event) => {
    const dateKey = formatDate(event.dateTime);
    const timeString = formatTime(event.dateTime);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(timeString);
    return acc;
  }, {});
}

const formatTimeSlot = (time) => time; 

function isWithinAvailability(startTime, duration, startHours, endHours) {
  const [startHour, startMinute] = startHours.split(":").map(Number);
  const [endHour, endMinute] = endHours.split(":").map(Number);

  const availabilityStart = new Date(startTime);
  availabilityStart.setHours(startHour, startMinute, 0, 0);

  const availabilityEnd = new Date(startTime);
  availabilityEnd.setHours(endHour, endMinute, 0, 0);

  const eventEndTime = new Date(startTime);
  eventEndTime.setMinutes(eventEndTime.getMinutes() + duration);

return moment(startTime).isSameOrAfter(moment(availabilityStart)) &&
  moment(eventEndTime).isSameOrBefore(moment(availabilityEnd));

}

function addDurationToDate(date, duration) {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + duration);
  return newDate;
}


module.exports = {
  generateSlots,
  isSlotAvailable,
  formatDateToCustomString,
  groupEventsByDate,
  formatTimeSlot,
  addDurationToDate,
  isWithinAvailability,
};
