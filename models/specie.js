const { Schema, model } = require("mongoose");

const SpecieSchema = Schema({
  specie: {
    type: String,
    required: [true, "La especie es obligatoria"],
  },
});

module.exports = model("Specie", SpecieSchema);
