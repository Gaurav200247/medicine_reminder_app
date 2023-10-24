const { mongoose } = require("mongoose");
const CreateTimer = require("../utils/CreateTimer");

const ReminderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },

    title: {
      type: String,
      required: true,
      minlength: [3, "Title is too short (min 3 letters)"],
    },

    description: {
      type: String,
      required: true,
      minlength: [3, "Description is too short (min 3 letters)"],
    },

    meds: [
      {
        med_name: { type: String, required: true },
        dosage: { type: String, required: true },
        med_desc: { type: String },
        med_prescription: { type: String },
      },
    ],

    timing: {
      day: { type: Number, required: true, minlength: 1, maxlength: 31 }, // date
      month: { type: Number, required: true, minlength: 1, maxlength: 12 }, // month
      year: { type: Number, required: true, minlength: 2023 }, // year

      hours: { type: Number, required: true, maxlength: 24, default: 0 }, // hour
      minutes: { type: Number, required: true, maxlength: 59, default: 0 }, // minute
      convention: {
        type: String,
        required: true,
        enum: ["AM", "PM"],
        default: "PM",
      }, // convention
    },

    TimerLife: { type: String, required: true }, // timerlife
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reminder", ReminderSchema);
