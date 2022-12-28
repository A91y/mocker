const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require('express-rate-limit')
const PORT = process.env.PORT || 4050;

//IMPORT ROUTES

const authRoute = require("./routes/auth/auth");
const projectRoute = require("./routes/project/project");
const resourceRoute = require("./routes/resource/resource");
const userRoute = require("./routes/user/user");
const serviceRouter = require("./routes/service/service");

dotenv.config();

//IMPORT MIDDLEWARE
const authenticate = require("./middleware/authenticate");

//CONNECTION TO DATABASE

mongoose.connect(
  process.env.DB_CONNECT,
  //   { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true },
  () => console.log("connected to db")
);
//MIDDLEWARE

app.use(cors())
app.use(rateLimit({
  windowMs: 1*60*1000, // 120 request per 1 minute
  max: 120,
}))
app.use(express.json());

//ROUTE MIDDLEWARE

app.use("/api/auth", authRoute);
app.use("/api/project", projectRoute);
app.use("/api/resource", resourceRoute);
app.use("/api/user", userRoute);
// app.use("/api/service", authenticate, serviceRouter)
app.use("/api/service", serviceRouter);

app.get("/", (req, res) => {
  res.send(`<h3>Hey! Mock API Backend is up !</h3>`);
});

app.listen(PORT, () => console.log(`server up and running at  ${PORT}`));
