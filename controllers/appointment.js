const { request, response } = require("express");
const Appointment = require("../models/appointment");

const getAppointments = async (req = request, res = response) => {
  const { limit = 15, from = 0 } = req.query;
  const consult = { state: true };

  const [total, appointment] = await Promise.all([
    Appointment.countDocuments(consult),
    Appointment.find(consult)
      .skip(from)
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
  const appointment = new Appointment({ detail, veterinarian, pet, date });
  // const date = req.body.date;
  const appointmentDB = await Appointment.findOne({ date });

  if (appointmentDB) {
    return res.status(400).json({
      msg: `El turno ${appointmentDB.date} ya está ocupado`,
    });
  }

  const data = {
    appointment,
    user: req.user._id,
  };

  const appointmentData = new Appointment(data);
  await appointmentData.save();
  res.status(200).json(appointmentData);
};

const putAppointment = async (req = request, res = response) => {
  const { id } = req.params;
  const date = req.body.date.toUpperCase();
  const user = req.user._id;
  console.log(id);
  const data = {
    date,
    user,
  };

  const appointment = await Appointment.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.status(200).json({
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
