const { Schema, model } = require("mongoose");

const VetSchema = Schema({
  veterinarian: {
    type: String,
    required: [true, "El nombre del veterinario es obligatorio"],
  },
});

module.exports = model("Veterinarian", VetSchema);
