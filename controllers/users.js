const { request, response } = require("express");

const bcrypts = require("bcryptjs");

const usuariosGet = (req = request, res = response) => {
  const { limit, page } = req.query;
  res.json({
    message: "GET usuarios - Controllers",
    limit,
    page,
  });
};
const usuarioPost = (req = request, res = response) => {
  const { name, email } = req.body;
  res.json({
    message: "POST usuarios - Controllers",
    name,
    email,
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
