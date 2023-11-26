const { Schema, model } = require("mongoose");

const AppointmentSchema = Schema({
  detail: {
    type: String,
    required: [true, "El detalle es obligatorio"]
  },
  veterinarian: {
    type: String,
     // enum: ["José Luis Olivares", "Raúl Álvarez"],
    required: [true, "El nombre del veterinario es obligatorio"],
  },
  pet: {
    type: String,
    required:  [true, "El nombre de la mascota es obligatorio"],
  },
  date: {
    type: Date,
    required: [true, "La fecha es obligatoria"],
    min: Date.now(),
    default: Date(),
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Appointment", AppointmentSchema);
