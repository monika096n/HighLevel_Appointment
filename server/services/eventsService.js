const {
  generateSlots,
  isSlotAvailable,
  formatDateToCustomString,
  groupEventsByDate,
  formatTimeSlot,
  isWithinAvailability,
  addDurationToDate,
} = require("../utils/dateUtils");
const moment = require("moment-timezone");
const appConfig = require("../config/appConfig");
const db = require("../config/firestoreConfig");

class EventsService {
  async getFreeSlots(date, timezone) {
    try {
      const start = appConfig.startHours;
      const end = appConfig.endHours;
      const duration = appConfig.slotDuration;

      const startDateInTimezone = moment.tz(date, timezone).startOf("day");
      const startDateIST = startDateInTimezone
        .clone()
        .tz("Asia/Kolkata")
        .toDate();
      const endDateIST = startDateInTimezone
        .clone()
        .tz("Asia/Kolkata")
        .add(1, "day")
        .toDate();

      const slots = generateSlots(
        startDateInTimezone.format("YYYY-MM-DD"),
        start,
        end,
        duration,
        timezone
      );

      const eventsSnapshot = await db
        .collection("events")
        .where("startTime", ">=", startDateIST)
        .where("endTime", "<", endDateIST)
        .get();

      const events = eventsSnapshot.docs.map((doc) => ({
        startTime: doc.data().startTime.toDate(),
        endTime: doc.data().endTime.toDate(),
      }));

      const availableSlots = slots.filter((slot) =>
        isSlotAvailable(slot, events)
      );

      const formattedSlots = availableSlots.map((slot) =>
        moment.tz(slot, timezone).format("hh:mm A")
      );

      return { freeSlots: availableSlots };
    } catch (error) {
      console.error("Error getting free slots:", error);
      throw new Error("Error retrieving free slots.");
    }
  }

  async createEvent(dateTime, duration) {
    try {
      const eventStartTime = moment.tz(dateTime, "Asia/Kolkata").toDate();
      const eventEndTime = addDurationToDate(eventStartTime, duration);

      if (
        !isWithinAvailability(
          eventStartTime,
          duration,
          appConfig.startHours,
          appConfig.endHours
        )
      ) {
        throw {
          status: 422,
          message: "Selected time is out of availability hours.",
        };
      }

      const slotAvailable = await this.isSlotAvailable(
        eventStartTime,
        eventEndTime
      );
      if (!slotAvailable) {
        return { status: 422, message: "Slot already booked." };
      }

      const eventRef = db.collection("events").doc();
      await eventRef.set({
        dateTime: eventStartTime,
        duration,
        startTime: eventStartTime,
        endTime: eventEndTime,
      });

      return { status: 200, message: "Event created successfully." };
    } catch (error) {
      console.error("Error creating event:", error);
      return error.status && error.message
        ? error
        : { status: 500, message: "An unexpected error occurred." };
    }
  }

  async isSlotAvailable(eventStartTime, eventEndTime) {
    try {
      const eventsSnapshot = await db
        .collection("events")
        .where("startTime", "<", eventEndTime)
        .where("endTime", ">", eventStartTime)
        .get();

      return eventsSnapshot.empty;
    } catch (error) {
      console.error("Error checking slot availability:", error);
      throw new Error("Error checking slot availability.");
    }
  }

  async getEvents(startDate, endDate) {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1);

      const eventsSnapshot = await db
        .collection("events")
        .where("startTime", ">=", start)
        .where("endTime", "<", end)
        .get();

      if (eventsSnapshot.empty) {
        return [];
      }

      const events = eventsSnapshot.docs.map((doc) => {
        const data = doc.data();
        let formattedDateTime;

        if (data.dateTime.toDate) {
          const dateInIST = data.dateTime.toDate();
          formattedDateTime = moment(dateInIST)
            .tz("Asia/Kolkata")
            .format("YYYY-MM-DD HH:mm");
        } else {
          formattedDateTime = moment(new Date(data.dateTime))
            .tz("Asia/Kolkata")
            .format("YYYY-MM-DD HH:mm");
        }

        return { ...data, dateTime: formattedDateTime };
      });
      const extractedData = events.map(({ dateTime, duration }) => ({ dateTime, duration }));
      return extractedData
    } catch (error) {
      console.error("Error retrieving events:", error);
      throw new Error("Error retrieving events.");
    }
  }
}

module.exports = new EventsService();
