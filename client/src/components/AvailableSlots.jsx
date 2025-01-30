import moment from "moment";
import React from "react";
import "./availableSlots.css";
import Loader from "./loader/Loader";

const AvailableSlots = ({
  availableSlots,
  selectedSlot,
  setSelectedSlot,
  setFormStepper,
  loading,
}) => {
  return (
    <div className="slots-main-container">
      {loading ? (
        <Loader />
      ) : availableSlots.length > 0 ? (
        availableSlots.map((slot, index) => (
          <div
            key={index}
            className={`slot-container ${
              selectedSlot === index ? "expanded" : ""
            }`}
          >
            <button
              className={`slot-button ${
                selectedSlot === index ? "shrink selected" : ""
              }`}
              onClick={() =>
                setSelectedSlot(selectedSlot === index ? null : index)
              }
            >
              {moment(slot).format("HH:mm a")}
            </button>
            {selectedSlot === index && (
              <button
                onClick={() => setFormStepper(1)}
                className="select-button"
              >
                Select
              </button>
            )}
          </div>
        ))
      ) : (
        <p>All available slots are booked for the current day</p>
      )}
    </div>
  );
};

export default AvailableSlots;
