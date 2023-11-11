const { Schema, model } = require("mongoose");

const AppointmentSchema = Schema({
  detail: {
    type: String,
    required: true,
  },
  veterinarian: {
    type: String,
    required: true,
  },
  pet: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Appointment", AppointmentSchema);
