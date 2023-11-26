const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin haber validado el token",
    });
  }

  //obtener los datos necesarios
  const { role, name } = req.user;

  //si el rol es ADMIN_ROLE

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} no es administrador`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol sin haber validado el token",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `El servicio requiere alguno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole
};
