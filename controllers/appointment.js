const { request, response } = require("express");
const Appointment = require("../models/appointment");

const getAppointments = async (req = request, res = response) => {
  const { limit = 15, from = 0 } = req.query;
  const consult = { state: true };

  const [total, appointment] = await Promise.all([
    Appointment.countDocuments(consult),
    Appointment.find(consult).skip(from).limit(limit),
  ]);

  res.status(200).json({
    total,
    appointment,
  });
};

const getAppointment = async (req = request, res = response) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);

  res.status(200).json({
    appointment,
  });
};

const postAppointment = async (req = request, res = response) => {
  const { detail, veterinarian, pet, date } = req.body;
  const appointment = new Appointment({ detail, veterinarian, pet, date });
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

  const { detail, veterinarian, pet, date, ...rest } = req.body;

  const appointment = await Appointment.findByIdAndUpdate(id, rest, {
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
