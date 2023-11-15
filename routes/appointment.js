const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

//importar función para validar si la categoría existe
const { appointmentExist } = require("../helpers/db-validators");
const validateJWT = require("../middlewares/validate-jwt");


const {
  postAppointment,
  getAppointments,
  getAppointment,
  putAppointment,
  deleteAppointment,
} = require("../controllers/appointment");


const router = Router();

router.get("/", getAppointments);

router.get(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(appointmentExist),
    validateFields,
  ],
  getAppointment
);

router.post(
  "/",
  [
    validateJWT,
    check("detail", "El detalle es obligatorio").notEmpty(),
    check(
      "veterinarian",
      "El nombre del veterinario es obligatorio"
    ).notEmpty(),
    check("pet", "El nombre de la mascota es obligatorio").notEmpty(),
    check("date", "La fecha es obligatoria").notEmpty(),
  ],
  postAppointment
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(appointmentExist),
    check("detail", "El detalle es obligatorio").notEmpty(),
    check(
      "veterinarian",
      "El nombre del veterinario es obligatorio"
    ).notEmpty(),
    check("pet", "El nombre de la mascota es obligatorio").notEmpty(),
    check("date", "La fecha es obligatoria").notEmpty(),
    validateFields,
  ],
  putAppointment
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(appointmentExist),
    validateFields,
  ],
  deleteAppointment
);

module.exports = router;
