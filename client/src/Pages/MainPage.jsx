import React, { useEffect, useState } from "react";
import "./mainPage.css";
import BasicDateCalendar from "../components/Calendar";
import Appointments from "../components/Appointments";
import AvailableSlots from "../components/AvailableSlots";
import dayjs from "dayjs";
import AppointmentForm from "../components/AppointmentForm";
import axios from "axios";
import moment from "moment";
import Confirmation from "../components/Confirmation";

const MainPage = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [formStepper, setFormStepper] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitLoader, setSubmitLoader] = useState(false);


  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      const selectedDateTime = selectedDate?.$d;
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/events/free-slots?date=${moment(
          selectedDateTime
        ).format("YYYY-MM-DD")}&timezone=Asia/Kolkata`
      );
      setAvailableSlots(res?.data?.freeSlots);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAvailableSlots();
  }, [selectedDate]);

 

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotSelection = (index) => {
    setSelectedSlot(availableSlots[index]);
  };
  const convertUTCToLocal = (utcString, timeZone) => {
    const date = new Date(utcString);
    return date.toLocaleString("sv-SE", { timeZone }).replace(" ", "T");
  };

  const handleCreateMeeting = async (e, formData) => {
    try {
      e.preventDefault();
      setSubmitLoader(true);
      const scheduleTime = convertUTCToLocal(
        availableSlots[selectedSlot],
        "Asia/Kolkata"
      );
       await axios.post(
        `${process.env.REACT_APP_API_URL}/events/create-event`,
        {
          dateTime: scheduleTime,
          duration: 30,
        }
      );
      setSubmitLoader(false);
      setFormStepper(2);
    } catch (error) {
      setSubmitLoader(false);
      console.log(error);
      window.alert(
        `Error While Creating Event ---  ${error?.response?.data?.message}`
      );
    } finally {
      setSubmitLoader(false);
    }
  };

  return (
    <>
      {formStepper === 2 && (
        <Confirmation
          date={convertUTCToLocal(availableSlots[selectedSlot], "Asia/Kolkata")}
        />
      )}

      {formStepper !== 2 && (
        <div className="container">
          {submitLoader && <div className="transparent-backdrop"></div>}
          <div className="sub-container">
            {formStepper !== 2 && (
              <div className="appointment-div">
                <Appointments
                  appointment={{
                    date: selectedDate,
                    duration: "00:30",
                    selectedSlot: availableSlots[selectedSlot],
                  }}
                  setFormStepper={setFormStepper}
                  formStepper={formStepper}
                  selectedDate={new Date(selectedDate)}
                />
              </div>
            )}
            {formStepper === 0 && (
              <>
                <div className="calendar-div">
                  <h4>Select Date & Time</h4>
                  <BasicDateCalendar
                    selectedDate={selectedDate}
                    handleDateChange={handleDateChange}
                  />
                </div>
                <div className="slots-div">
                  <AvailableSlots
                    availableSlots={availableSlots}
                    handleSlotSelection={handleSlotSelection}
                    selectedSlot={selectedSlot}
                    setSelectedSlot={setSelectedSlot}
                    setFormStepper={setFormStepper}
                    loading={loading}
                  />
                </div>
              </>
            )}
            {formStepper === 1 && (
              <AppointmentForm handleCreateMeeting={handleCreateMeeting} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
