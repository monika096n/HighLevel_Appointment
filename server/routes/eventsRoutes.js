const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

router.get("/free-slots", eventsController.getFreeSlots);  
router.post("/create-event", eventsController.createEvent); 
router.get("/get-events", eventsController.getEvents); 

module.exports = router;
