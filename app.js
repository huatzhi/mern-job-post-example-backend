require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");


// const mongoose = require("mongoose");

// const uri = ""

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, err => {
//   if (err) {
//     console.error("mongoose connection error:", err);
//     return;
//   }
//   console.log("mongoose connection is up.");
// });

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/is-up", (req, res) => {
  res.status(200).json({ ok: 1 });
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Job application backend is listening on port ${port}`);
});