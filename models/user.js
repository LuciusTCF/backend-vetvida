const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "El teléfono es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },

  role: {
    type: String,
    enum: [
      "ADMIN_ROLE",
      "USER_ROLE_NP",
      "USER_ROLE_P1",
      "USER_ROLE_P2",
      "USER_ROLE_P3",
    ],
    default: "USER_ROLE_NP",
  },
  pet: {
    type: Array,
    items: {
      type: Object,
      properties: {
        name: {
          type: String,
          required: [true, "El nombre es obligatorio"],
        },
        specie: {
          type: String,
          required: [true, "La especie es obligatoria"],
        },
        breed: {
          type: String,
          required: [true, "La raza es obligatoria"],
        },
        age: {
          type: Number,
          required: [true, "La edad es obligatoria"],
        },
      },
    },
    cuantity: {
      type: Number,
    },

    required: function () {
      return this.role === "USER_ROLE_NP";
    },
  },
  img: {
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);
