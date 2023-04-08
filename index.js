require("dotenv").config();

const express = require("express");
const routes = require("./routes/apis");
const app = express();
const bodyParser = require("body-parser");
const uri = process.env.MONGO_DB_URI;
const mongoose = require("mongoose");

const cors = require("cors");

// connect to mongodb
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.use(cors());
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
