const { Schema, model } = require("mongoose");

const AppointmentSchema = Schema({
  detail: {
    type: String,
    required: [true, "El detalle es obligatorio"],
  },
  veterinarian: {
    type: String,
    required: [true, "El nombre del veterinario es obligatorio"],
  },
  pet: {
    type: String,
    required: [true, "El nombre de la mascota es obligatorio"],
  },
  date: {
    type: Date,
    required: [true, "La fecha es obligatoria"],
    min: Date(),
    default: Date(),
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
  client: {
    type: Object,
    properties: {
      nameuser: {
        type: String,
        required: [true, "El nombre es obligatorio"],
      },
      emailuser: {
        type: String,
        required: [true, "El correo es obligatorio"],
      },
      phoneuser: {
        type: String,
        required: [true, "El teléfono es obligatoria"],
      },
      iduser: {
        type: String,
        required: [true, "El ID es obligatoria"],
      },
    },
    required: [true, "El cliente es obligatorio"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

AppointmentSchema.methods.toJSON = function () {
  const { __v, _id, ...appointment } = this.toObject();
  appointment.aid = _id;
  return appointment;
};

module.exports = model("Appointment", AppointmentSchema);
