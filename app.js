require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

require("./modules/mongoose");

const router = require("./routes/index");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(router);

app.get("/is-up", (req, res) => {
  res.status(200).json({ ok: 1 });
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Job application backend is listening on port ${port}`);
});