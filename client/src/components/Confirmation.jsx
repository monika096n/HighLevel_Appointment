import React from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PublicIcon from "@mui/icons-material/Public";
import formatAppointmentTime from '../helper'
const ScheduledMeeting = ({date}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9fafb",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          marginBottom: 4,
        }}
      >
        <CalendarTodayIcon sx={{ fontSize: 50, color: "#4f46e5" }} />
        <Typography variant="h5" fontWeight="bold">
          Your Meeting has been Scheduled
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Thank you for your appointment request. We will contact you shortly to
          confirm your request. Please call our office at{" "}
          <strong>0343 676 7676</strong> if you have any questions.
        </Typography>
      </Box>
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          padding: 2,
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              marginBottom: 2,
            }}
          >
            <AccessTimeIcon />
            <Typography>30 Mins</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              marginBottom: 2,
            }}
          >
            <CalendarTodayIcon />
            <Typography>{formatAppointmentTime(date)}</Typography>

          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <PublicIcon />
            <Typography>Asia/Calcutta (GMT+5:30)</Typography>
          </Box>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginTop: 3,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#34a853",
            color: "#fff",
            textTransform: "none",
          }}
        >
          Google Calendar
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1a73e8",
            color: "#fff",
            textTransform: "none",
          }}
        >
          Outlook Calendar
        </Button>
        <Button
          variant="outlined"
          sx={{ borderColor: "#000", textTransform: "none" }}
        >
          iCloud Calendar
        </Button>
      </Box>
    </Box>
  );
};

export default ScheduledMeeting;
