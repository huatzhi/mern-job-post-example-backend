const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, err => {
  if (err) {
    console.error("mongoose connection error:", err);
    return;
  }
  console.log("mongoose connection is up.");
});