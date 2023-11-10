const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  isRoleValid,
  emailExist,
  phoneExist,
  userByIdExist,
} = require("../helpers/db-validators");
const {
  usersGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("password", "La contraseña debe tener más de 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "EL email no es válido").isEmail(),
    check("email").custom(emailExist),
    check("phone").custom(phoneExist),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  userPost
);
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId,
    check("id").custom(userByIdExist),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  userPut
);
router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId,
    check("id").custom(userByIdExist),
    validateFields,
  ],
  userDelete
);

module.exports = router;
