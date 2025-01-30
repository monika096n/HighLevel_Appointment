const eventsService = require("../services/eventsService");

class EventsController {
  async getFreeSlots(req, res) {
    try {
      const { date, timezone } = req.query;
      const freeSlots = await eventsService.getFreeSlots(
        date,
        timezone || "UTC"
      );
      res.status(200).json(freeSlots);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createEvent(req, res) {
    try {  
      const {duration,dateTime} = req.body;
      if (!dateTime || !duration) {
        return res.status(400).json({ message: "Missing required fields: dateTime and duration." });
      }
      const booked_at=new Date()
      const result = await eventsService.createEvent(dateTime, duration,booked_at);
      res.status(result.status).json(result);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "An unexpected error occurred." });
    }
    
  }

  async getEvents(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const events = await eventsService.getEvents(startDate, endDate);
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new EventsController();
