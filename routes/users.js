const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../middlewares/validate-role");
const {
  isRoleValid,
  emailExist,
  phoneExist,
  userByIdExist,
  isSpecieValid,
} = require("../helpers/db-validators");
const {
  usersGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", [validateJWT, hasRole("ADMIN_ROLE")], usersGet);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("password", "Debe tener mínimo 8 caracteres y máximo 16").matches(
      /^.{8,16}$/
    ),
    check("email", "EL email no es válido").isEmail(),
    check("email").custom(emailExist),
    check("phone").custom(phoneExist),
    check("role").custom(isRoleValid),
    check("specie").custom(isSpecieValid),
    validateFields,
  ],
  userPost
);
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId,
    check("id").custom(userByIdExist),
    check("role").custom(isRoleValid),
    check("specie").custom(isSpecieValid),
    validateFields,
  ],
  userPut
);
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un ID válido").isMongoId,
    check("id").custom(userByIdExist),
    validateFields,
  ],
  userDelete
);

module.exports = router;
