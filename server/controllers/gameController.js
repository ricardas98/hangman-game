const words = require("../storage/Words");
let games = require("../storage/Games");

//VALIDATION
const { createGameValidation } = require("../validation");

module.exports = {
  create: async function (req, res) {
    try {
      //Validate data
      const { error } = createGameValidation(req.body);
      if (error) return res.status(400).json({ Error: error.details[0].message });

      //Pick random word
      const index = Math.floor(Math.random() * words.length);

      //Create game
      const newGame = {
        word: words[index],
        wordGuessed: "_".repeat(words[index].length),
        misses: [],
        id: String(Date.now().toString() + "x" + Math.floor(Math.random(0) * 10000).toString()),
      };

      //Save game to storage
      games.push(newGame);

      //Send command to the client
      const command = {
        id: "00",
        data: {
          word: newGame.wordGuessed,
          misses: newGame.misses,
        },
      };
      res.status(201).json(command);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  },
  update: async function (req, res) {},
  delete: async function (req, res) {
    try {
      const filteredGames = games.filter((x) => x.id !== req.params.id);
      games = filteredGames;
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  },
  getAll: async function (req, res) {
    try {
      res.status(200).json(games);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  },
};
