require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

require("./modules/mongoose");

const router = require("./routes/index");
const passport = require("passport");

const app = express();

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 100
}));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(passport.initialize({ session: false }));
require("./modules/passport")(passport);

app.use(router);

app.get("/is-up", (req, res) => {
  res.status(200).json({ ok: 1 });
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Job application backend is listening on port ${port}`);
});