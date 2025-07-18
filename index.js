const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./db");
const serverless = require("serverless-http");
const { courseRouter } = require("./routes/courses.routes");
const { reviewRouter } = require("./routes/reviews.routes");
const { reportRouter } = require("./routes/report.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Home Page" });
});

app.use("/courses", courseRouter);
app.use("/reviews", reviewRouter);
app.use("/reports", reportRouter);

// Connect to DB (run once when the function container initializes)


(async () => {
  try {
    await connectDB(); // ⛳ called only once
  } catch (err) {
    console.error("DB connection failed:", err);
  }
})();

// ✅ Export only this — DO NOT redefine or wrap again
module.exports = serverless(app);
