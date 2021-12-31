const words = require("../storage/Words");
let games = require("../storage/Games");

//VALIDATION
const { createGameValidation, updateGameValidation } = require("../validation");

const createCommand = (id, data) => {
  const command = {
    id: id,
    data: {
      id: data?.id || "",
      word: data?.wordGuessed || "",
      misses: data?.misses || "",
    },
  };
  return command;
};

const deleteGame = (id) => {
  const filteredGames = games.filter((x) => x.id !== id);
  games = [...filteredGames];
};

module.exports = {
  create: async function (req, res) {
    try {
      //Validate data
      const { error } = createGameValidation(req.body);
      if (error) return res.status(400).json({ Error: error.details[0].message });

      //Clean up old previous games
      const date = Date.now();
      const dateThreshold = date - 600000;
      //console.log(parseInt(games[0]?.id.split("x")[0]) - dateThreshold);
      const filteredGames = games.filter((x) => parseInt(x.id.split("x")[0]) - dateThreshold > 0);
      games = [...filteredGames];

      //Pick random word
      const index = Math.floor(Math.random() * words.length);

      //Create game
      const newGame = {
        word: words[index],
        wordGuessed: "_".repeat(words[index].length),
        misses: [],
        id: String(date.toString() + "x" + Math.floor(Math.random(0) * 10000).toString()),
      };

      //Save game to storage
      games.push(newGame);

      //Send command to the client
      res.status(201).json(createCommand(0, newGame));
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  },
  update: async function (req, res) {
    try {
      //Check if the game exists
      let game = games.find((x) => x.id == req.params.id);
      if (!game) return res.status(404).json({ Error: "Game does not exist" });

      //Validate data
      const { error } = updateGameValidation(req.body);
      if (error) return res.status(400).json({ Error: error.details[0].message });

      //Check if the guess matches any letters
      const letter = req.body.letter.toLowerCase();
      let wordGuessed = "";

      //Check if the guess is correct
      if (game.word.includes(letter)) {
        //Check if the letter was already guessed
        if (game.wordGuessed.includes(letter)) {
          res.status(200).json(createCommand(0, game));
          return;
        }

        //Update guessed word
        for (let i = 0; i < game.word.length; i++) {
          if (game.word[i] === letter) {
            wordGuessed += letter;
          } else {
            wordGuessed += game.wordGuessed[i];
          }
        }

        //Check if game is completed
        game.wordGuessed = wordGuessed;
        if (game.word === wordGuessed) {
          deleteGame(req.params.id);
          res.status(200).json(createCommand(2, game));
          return;
        }

        //Update game data if not completed
        const filteredGames = games.filter((x) => x.id !== req.params.id);
        games = [game, ...filteredGames];
        res.status(200).json(createCommand(0, game));
      } else if (!game.misses.includes(letter)) {
        //Check if missed letter was already guessed
        game.misses.push(letter);
        //Check if player is able to guess (max misses reached)
        if (game.misses.length == 10) {
          res.status(200).json(createCommand(1, game));
          deleteGame(req.params.id);
        } else {
          res.status(200).json(createCommand(0, game));
        }
      } else {
        res.status(200).json(createCommand(0, game));
      }
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  },
  delete: async function (req, res) {
    try {
      //Check if the game exists
      const game = games.find((x) => x.id === req.params.id);
      if (!game) return res.status(404).json({ Error: "Game does not exist" });

      //Delete the game
      deleteGame(req.params.id);
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
