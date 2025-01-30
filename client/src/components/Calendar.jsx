import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

export default function BasicDateCalendar({ selectedDate, handleDateChange }) {
  const disableSundays = (date) => {
    const isSunday = date.day() === 0;
    const isPastDate = date.isBefore(dayjs(), "day");
    return isSunday || isPastDate;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={handleDateChange}
        shouldDisableDate={disableSundays}
        views={["day"]}
        minDate={dayjs()} 
        sx={{
    
          "& .Mui-selected": {
            backgroundColor: "#155EEE !important",
            color: "white !important",
            borderRadius: "50%",
            fontWeight: "600",
          },


          "& .MuiPickersDay-dayWithMargin:not(.Mui-selected):not(.Mui-disabled)":
            {
              backgroundColor: "#EFF4FE",
              borderRadius: "50%",
              color: "#155EEE",
              fontWeight: "semi-bold",
            },

          "& .MuiPickersDay-today": {
            border: "none !important",
            position: "relative",
            "&::after": {
              content: '""',
              display: "block",
              width: "4px",
              height: "4px",
              backgroundColor: "#155EEE",
              borderRadius: "50%",
              position: "absolute",
              bottom: "4px",
              left: "50%",
              transform: "translateX(-50%)",
            },
          },

          "& .MuiPickersCalendarHeader-root": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
          },

          "& .MuiPickersCalendarHeader-labelContainer": {
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            fontWeight: "semi-bold",
            fontSize: "1.2rem",
            textAlign: "center",
          },
          ".MuiPickersCalendarHeader-root": {
            display: "grid !important",
            gridTemplateColumns: "auto 1fr auto !important",
          },
          ".MuiPickersCalendarHeader-labelContainer": {
            gridColumn: " 2 !important",
            gridRow: "1 !important",
            justifySelf: "center",
            margin: 0,
            marginLeft: "5.5%",
          },
          ".MuiPickersArrowSwitcher-root": {
            display: "grid !important",
            gridTemplateColumns: "subgrid !important",
            gridColumn: "1 / 4 !important",
            gridRow: "1 !important",
          },
          "& .MuiPickersArrowSwitcher-button": {
            backgroundColor: "#EFF4FE",
            color: "#155EEE", 
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "#155EEE", 
              color: "#EFF4FE", 
            },
            "&:disabled": {
              backgroundColor: "transparent",
              color: "#C0C0C0"
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
