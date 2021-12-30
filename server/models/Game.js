const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
      unique: true,
    },
    guessedWord: {
      type: String,
      required: true,
      unique: true,
    },
    misses: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", GameSchema);
