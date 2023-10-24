require("dotenv").config();
require("express-async-errors");

const cookieParser = require("cookie-parser");

const express = require("express");
const connectDB = require("./DB/connectDB");
const notFound = require("./Middlewares/notFound");
const errHandler = require("./Middlewares/errHandler");
const userRouter = require("./Routers/UserRoutes");
const ReminderRouter = require("./Routers/ReminderRoutes");

const app = express();

// -------------- middlewares --------------
app.use(express.json());
app.use(cookieParser());

// -------------- app routes --------------
app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

app.use("/api/v1", userRouter);
app.use("/api/v1", ReminderRouter);

//-------------- custom middlewares --------------
app.use(errHandler); //used to get cutom error message for some particular errors
app.use(notFound); //applied to routes with no controllers

// -------------- app start --------------
const PORT = process.env.PORT || 4000;

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(
        `App listening on port ${PORT}... :- http://localhost:4000/ `
      );
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
