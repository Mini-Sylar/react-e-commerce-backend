require("dotenv").config();

const express = require("express");
const routes = require("./routes/apis");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const uri = process.env.MONGO_DB_URI;
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cookieParser());
// connect to mongodb
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

const corsConfig = {
  credentials: true,
  origin: process.env.FRONTEND_URL,
  sameSite: "none",
  Secure: true,
};
app.use(cors(corsConfig));
// initialize middleware
app.use(bodyParser.json());

// initialize routes
app.use("/api", routes);
// error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
