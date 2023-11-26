const { request, response } = require("express");
const Appointment = require("../models/appointment");
// const bcrypt = require("bcryptjs");

const getAppointments = async (req = request, res = response) => {
  const { limit = 10, from = 0 } = req.query;
  const consult = { state: true };

  const [total, appointment] = await Promise.all([
    Appointment.countDocuments(consult),
    Appointment.find(consult)
      // .skip(from)
      .limit(limit)
      .populate("user", "name email"),
  ]);

  res.status(200).json({
    total,
    appointment,
  });
};

const getAppointment = async (req = request, res = response) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id).populate(
    "user",
    "name email"
  );

  res.status(200).json({
    appointment,
  });
};

const postAppointment = async (req = request, res = response) => {
  const { detail, veterinarian, pet, date } = req.body;
  const user = req.user._id;
  const appointment = new Appointment({
    detail,
    veterinarian,
    pet,
    date,
    user,
  });
  const appointmentDB = await Appointment.findOne({ date });

  if (appointmentDB) {
    return res.status(400).json({
      msg: `El turno ${appointmentDB.date} ya está ocupado`,
    });
  }
  await appointment.save();
  res.status(200).json(appointment);
};

const putAppointment = async (req = request, res = response) => {
  const { id } = req.params;

  const { detail, veterinarian, pet, date, state, user } = req.body;

  const data = { id, detail, veterinarian, pet, date, state, user };

  const appointment = await Appointment.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.status(200).json({
    message: "Turno actualizado",
    appointment,
  });
};

const deleteAppointment = async (req = request, res = response) => {
  const { id } = req.params;

  const deletedAppointment = await Appointment.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );
  res.status(200).json({
    msg: "Turno inactivado",
    deletedAppointment,
  });
};

module.exports = {
  postAppointment,
  getAppointments,
  getAppointment,
  putAppointment,
  deleteAppointment,
};
