import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  Box,
  Container,
  InputAdornment,
  FormHelperText,
} from "@mui/material";

const AppointmentForm = ({ handleCreateMeeting }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    additionalInfo: "",
    marketingConsent: false,
  });


  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "marketingConsent" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        component="form"
        onSubmit={(e) => handleCreateMeeting(e, formData)}
        noValidate
      >
        <Typography variant="h4" gutterBottom>
          Enter Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box display="flex" alignItems="center">
                      +91
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Additional Information
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Is there anything you would like us to know before your appointment?"
              error={!!errors.additionalInfo}
              helperText={errors.additionalInfo}
            />
            <FormHelperText sx={{ textAlign: "right" }}>
              {formData.additionalInfo.length}/500 characters
            </FormHelperText>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                 required={true}
                  name="marketingConsent"
                  checked={formData.marketingConsent}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="I confirm that I want to receive content from this company using any contact information I provide."
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Schedule Meeting
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AppointmentForm;
