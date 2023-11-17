const Role = require("../models/role");
const User = require("../models/user");
const Appointment = require("../models/appointment");

const isRoleValid = async (role = "USER_ROLE_NP") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

const emailExist = async (email) => {
  const emailFound = await User.findOne({ email });
  if (emailFound) {
    throw new Error(`El correo ${email} ya está registrado`);
  }
};

const phoneExist = async (phone) => {
  const phoneFound = await User.findOne({ phone });
  if (phoneFound) {
    throw new Error(`El teléfono ${phone} ya está registrado`);
  }
};

const userByIdExist = async (id) => {
  const userFound = await User.findById(id);
  if (!userFound) {
    throw new Error(`El ID ${id} NO existe`);
  }
  if (!userFound.state) {
    throw new Error(`El usuario ${userFound.name} está inactivo`);
  }
};

const appointmentExist = async (id) => {
  const appointmentFound = await Appointment.findById(id);
  if (!appointmentFound) {
    throw new Error(`El ID ${id} no existe en la BD`);
  }
  if (!appointmentFound.state) {
    throw new Error(`El turno ${appointmentFound.name} está inactivo`);
  }
};

module.exports = {
  isRoleValid,
  emailExist,
  phoneExist,
  userByIdExist,
  appointmentExist,
};
