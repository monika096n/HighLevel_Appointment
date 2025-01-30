const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const { db } = require("./config/firestoreConfig");
const eventsRoutes = require("./routes/eventsRoutes");

const app = express();

app.use(helmet()); 
app.use(xss()); 
app.use(cors());

app.use(express.json());

app.use("/api/events", eventsRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
