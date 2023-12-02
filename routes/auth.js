const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { login, getId } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", [validateJWT], getId);
router.post(
  "/login",
  [
    check("email", "Formato de correo electrónico").isEmail(),
    check("email", "El correo es obligatorio").notEmpty(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    check("password", "Debe tener entre 8 y 16 caracteres ").matches(
      /^.{8,16}$/
    ),
    validateFields,
  ],
  login
);

module.exports = router;
