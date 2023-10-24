const { StatusCodes } = require("http-status-codes");
const Reminder = require("../models/Reminder");
const CreateTimer = require("../utils/CreateTimer");
const DoesNotExist = require("../utils/DoesNotExist");
const schedule = require("node-schedule");
const SendMail = require("../utils/SendMail");
const SendSMS = require("../utils/SendSMS");
const customAPIError = require("../Errors/customError");

// ----------------------------get all reminders----------------------------
const getAllReminders = async (req, res) => {
  const reminders = await Reminder.find({ user: req.user.id });

  res
    .status(StatusCodes.OK)
    .json({ success: true, nbHits: reminders.length, reminders });
};

// ----------------------------get single reminder----------------------------
const getSingleReminder = async (req, res) => {
  const { id: reminder_id } = req.params;

  const reminder = await Reminder.findById(reminder_id);

  DoesNotExist(
    reminder,
    `Reminder with id ${reminder_id} not found !!`,
    StatusCodes.NOT_FOUND
  );

  res.status(StatusCodes.OK).json({ success: true, reminder });
};

// ----------------------------create a reminder----------------------------
const createReminder = async (req, res) => {
  const { timing, title, description, meds } = req.body;

  // creating reminder
  const TimerLife = CreateTimer(timing);

  DoesNotExist(
    TimerLife,
    "Please Provide valid Timings !!",
    StatusCodes.BAD_REQUEST
  );

  const reminderObj = { ...req.body, TimerLife, user: req.user };
  const reminder = await Reminder.create(reminderObj);

  // reminder msg prep
  const text = `${title}\n${description}\n\nMedicine :\n${meds.map(
    (item, index) =>
      `${index + 1}. ${item.med_name} (${item.dosage})\n-${item.med_desc} (${
        item.med_prescription
      })`
  )}`;

  const html = `
  <h1>Med Reminder Mail</h1>

  <h2>"${title}"</h2>
  <p>${description}</p>

  <ul>
  ${meds.map(
    (item, index) =>
      `<li style="margin-bottom: 10px" key=${index} >
      Medicine Name : ${item.med_name} <br />
      Dosgae : ${item.dosage} <br />
      Medicine Description : ${item.med_desc} <br />
      Medicine Purpose : ${item.med_prescription}
    </li>`
  )}
  </ul>`;

  console.log({ TimerLife });

  // schedule-timer
  schedule.scheduleJob(TimerLife, async function () {
    try {
      // send-mail
      await SendMail(req.user.email, text, html).then(() =>
        console.log(`Mail sent to ${req.user.mail}`)
      );

      // send-WhatsApp_message+SMS
      await SendSMS(req.user.contact_details, text).then(() =>
        console.log(`SMS sent to ${req.user.contact_details.phone_no}`)
      );
    } catch (error) {
      // error
      console.log(error);
      return new customAPIError(
        "Something Went wrong !!",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  });

  // response
  res.status(StatusCodes.OK).json({
    success: true,
    msg: "Reminder Created Successfully !!",
    reminder,
  });
};

// ----------------------------delete a reminder----------------------------
const deleteReminder = async (req, res) => {
  const { id: reminder_id } = req.params;

  let reminder = await Reminder.findById(reminder_id);

  DoesNotExist(
    reminder,
    `Reminder with id ${reminder_id} not found !!`,
    StatusCodes.NOT_FOUND
  );

  reminder = await Reminder.findByIdAndRemove(reminder_id);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: "Reminder Deleted Successfully !!",
    reminder,
  });
};

// ----------------------------update a reminder----------------------------
const updateReminder = async (req, res) => {
  const { id: reminder_id } = req.params;

  let reminder = await Reminder.findById(reminder_id);

  DoesNotExist(
    reminder,
    `Reminder with id ${reminder_id} not found !!`,
    StatusCodes.NOT_FOUND
  );

  let reminderObj = req.body;
  let TimerLife = req.body.TimerLife;

  if (reminderObj.timing) {
    TimerLife = CreateTimer(req.body.timing);
    reminderObj = { ...reminderObj, TimerLife };
  }

  reminder = await Reminder.findByIdAndUpdate(reminder_id, reminderObj, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    msg: "Reminder Updated Successfully !!",
    reminder,
  });
};

module.exports = {
  getAllReminders,
  createReminder,
  getSingleReminder,
  deleteReminder,
  updateReminder,
};
