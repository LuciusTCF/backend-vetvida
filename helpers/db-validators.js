const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = "USER_ROLE") => {
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
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`El ID ${id} NO existe`);
  }
};

module.exports = {
  isRoleValid,
  emailExist,
  phoneExist,
  userByIdExist,
};
