const Role = require("../models/role");
const User = require("../models/user");
const Appointment = require("../models/appointment");
const Veterinarian = require("../models/veterinarian");
const Specie = require("../models/specie");

const isRoleValid = async (role = "USER_ROLE_NP") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

const isVetValid = async (veterinarian) => {
  const vetExist = await Veterinarian.findOne({ veterinarian });
  if (!vetExist) {
    throw new Error(
      `El veterinario ${veterinarian} no está registrado en la BD`
    );
  }
};

const isSpecieValid = async (specie) => {
  const specieExist = await Specie.findOne({ specie });
  if (!specieExist) {
    throw new Error(`La especie ${specie} no está registrada en la BD`);
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
    throw new Error(`El turno ${appointmentFound.date} está inactivo`);
  }
};

module.exports = {
  isRoleValid,
  isVetValid,
  isSpecieValid,
  emailExist,
  phoneExist,
  userByIdExist,
  appointmentExist,
};
