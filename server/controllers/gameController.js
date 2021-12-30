const Game = require("../models/Game");
const Word = require("../models/Word");

//VALIDATION
const { creatGameValidation } = require("../validation");

module.exports = {
  create: async function (req, res) {
    try {
      //Validate data
      const error = createGameValidation(req.body);
      if (error) return res.status(400).json({ Error: error.details[0].message });

      //Pick random word
      const words = await Word.find();

      //Create object
      const index = Math.floor(Math.random() * words.length);
      const newGame = Game({
        word: words[index].value,
        wordGuessed: "_".repeat(words[index].value.length),
        misses: [],
      });
      const game = await newGame.save();
      res.status(201).json(game);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  },
  update: async function (req, res) {},
  delete: async function (req, res) {},
  getAll: async function (req, res) {},
};
