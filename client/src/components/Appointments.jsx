import React, { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import moment from "moment";
import "./appointment.css";
import IconButton from "@mui/material/IconButton";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import axios from "axios";

const Appointments = ({ appointment, formStepper, setFormStepper,selectedDate }) => {
  const [bookedAppointments, setBookedAppointments] = useState([]);

  useEffect(() => {
    
    if (appointment.date) {
      fetchBookedAppointments();
    }
  }, [appointment.date,selectedDate]);

  const fetchBookedAppointments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/events/get-events?startDate=${moment(
          selectedDate
        ).format("YYYY-MM-DD")}&endDate=${moment(selectedDate).format(
          "YYYY-MM-DD"
        )}`
      );
      setBookedAppointments(res.data);
    } catch (error) {
      console.error(`Error while getting Booked Appointments list: ${error}`);
    }
  };

  const dateTimeFormatter = (date) => {
    date = new Date(date);
    if (appointment.selectedSlot) {
      return `${moment(appointment.selectedSlot).format("HH:mm a")} - ${moment(
        appointment.selectedSlot
      )
        .add(30, "minute")
        .format("HH:mm a")}, ${moment(date).format("ddd, MMM DD, YYYY")}`;
    } else {
      return `${moment(date).format("ddd, MMM DD, YYYY")}`;
    }
  };

  return (
    <div className="apointment-lhs-container">
      {formStepper === 1 && (
        <IconButton
          onClick={() => setFormStepper(0)}
          sx={{
            backgroundColor: "#f3f4f6",
            marginBottom: "15px",
            color: "#4f46e5",
            width: 56,
            height: 56,
            "&:hover": {
              backgroundColor: "#e0e7ff",
            },
          }}
        >
          <ArrowBackTwoToneIcon />
        </IconButton>
      )}
      {appointment && (
        <div className="appointment-main-container">
            <h3>{`Current Booking`}</h3>
          <div className="appointment-current">
            <div className="appointment-name-div">
              <h3>Dr John Doe</h3>
            </div>
            <div className="appointment-duration-div">
              <AccessTimeIcon />
              <p>{appointment.duration} minutes</p>
            </div>
            <div className="appointment-time-div">
              <CalendarTodayOutlinedIcon />
              <p>{dateTimeFormatter(appointment.date)}</p>
            </div>
          </div>
        </div>
      )}
      <h3>{`Booked Slots for ${moment(selectedDate).format('DD-MMM-YYYY')}`}</h3>
      <div className = 'appointment-container'>
      {bookedAppointments?.map((booking, index) => (
        <div key={index} className="booked-appointments-container">
          <div className="appointment-name-div">
            <h3>Dr John Doe {index + 1}</h3>
          </div>
          <div className="appointment-duration-div">
            <AccessTimeIcon />
            <p>{booking.duration} minutes</p>
          </div>
          <div className="appointment-time-div">
            <CalendarTodayOutlinedIcon />
            <p>
              {moment(booking.dateTime).format("DD-MM-YYYY HH:mm a")} 
              {/* {moment.unix(booking.endTime._seconds).format("HH:mm a")} */}
            </p>
          </div>
        </div>
      ))}
      </div>
   
    </div>
  );
};

export default Appointments;
