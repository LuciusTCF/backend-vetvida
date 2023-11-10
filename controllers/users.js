const { request, response } = require("express");
const User = require("../models/user");

const bcrypts = require("bcryptjs");

const usuariosGet = (req = request, res = response) => {
  const { limit, page } = req.query;
  res.json({
    message: "GET usuarios - Controllers",
    limit,
    page,
  });
};
const usuarioPost = async (req = request, res = response) => {
  const { name, email, phone, password, pet } = req.body;
  const user = new User({ name, email, phone, password, pet });
  await user.save();
  res.status(201).json({
    message: "Usuario creado",
    user,
  });
};
const usuarioPut = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    message: "PUT usuarios - Controllers",
    id,
  });
};
const usuarioDelete = (req = request, res = response) => {
  res.json({
    message: "DELETE usuarios - Controllers",
  });
};

module.exports = {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
