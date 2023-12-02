const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../middlewares/validate-role");

const { appointmentExist, isVetValid } = require("../helpers/db-validators");


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

    hasRole("ADMIN_ROLE"),

    check("detail", "El detalle es obligatorio").notEmpty(),
    check(
      "veterinarian",
      "El nombre del veterinario es obligatorio"
    ).notEmpty(),
    check("pet", "El nombre de la mascota es obligatorio").notEmpty(),
    check("date", "La fecha es obligatoria").notEmpty(),
    check("veterinarian").custom(isVetValid),

    validateFields,

  ],
  postAppointment
);

router.put(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(appointmentExist),
    check("detail", "El detalle es obligatorio").notEmpty(),
    check(
      "veterinarian",
      "El nombre del veterinario es obligatorio"
    ).notEmpty(),
    check("pet", "El nombre de la mascota es obligatorio").notEmpty(),
    check("date", "La fecha es obligatoria").notEmpty(),
    check("veterinarian").custom(isVetValid),
    validateFields,
  ],
  putAppointment
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(appointmentExist),
    validateFields,
  ],
  deleteAppointment
);

module.exports = router;
