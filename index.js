const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const apiRoutes = require("./routes/api.js");

app.use("/api", apiRoutes);

require("dotenv").config();

console.log(process.env.ATLAS_CONNECTION_URL);
mongoose
  .connect(process.env.ATLAS_CONNECTION_URL, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => {
    console.log(err);
  });
mongoose.Promise = global.Promise;

app.listen(process.env.PORT, () => {
  console.log(`Application is started on ${process.env.PORT}`);
});
