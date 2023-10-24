const express = require("express");
const {
  getAllReminders,
  createReminder,
  getSingleReminder,
  deleteReminder,
  updateReminder,
} = require("../controllers/Reminder");
const { isAuthRoute } = require("../Middlewares/Auth");

const router = express.Router();

//------------------ public routes ------------------
router
  .route("/me/reminders")
  .get(isAuthRoute, getAllReminders)
  .post(isAuthRoute, createReminder);

router
  .route("/me/reminders/:id")
  .get(isAuthRoute, getSingleReminder)
  .delete(isAuthRoute, deleteReminder)
  .put(isAuthRoute, updateReminder);

module.exports = router;
