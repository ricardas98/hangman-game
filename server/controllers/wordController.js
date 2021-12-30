const Word = require("../models/Word");

//VALIDATION
const { createWordValidation } = require("../validation");

//FUNCTIONS
async function wordExists(value) {
  return (await Word.findOne({ value: value.toLowerCase() })) ? true : false;
}

module.exports = {
  create: async function (req, res) {
    try {
      //Validate data
      const { error } = createWordValidation(req.body);
      if (error) return res.status(400).json({ Error: error.details[0].message });

      //Check if word already exists
      if (await wordExists(req.body.value)) return res.status(400).json({ Error: "Word already exists" });

      //Create object
      const newWord = Word({
        value: req.body.value.toLowerCase(),
      });
      const word = await newWord.save();

      res.status(201).json(word);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  },
  delete: async function (req, res) {
    try {
      //Check if word exists in database
      if (!(await wordExists(req.params.value))) return res.status(404).json({ Error: "Word not found" });

      //Delete word
      const word = await Word.findOne({ value: req.params.value.toLowerCase() });
      await word.delete();

      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  },
  getAll: async function (req, res) {
    try {
      const words = await Word.find();

      let wordsPayload = [];
      words.forEach((word) => {
        word = word.toObject();
        wordsPayload.push(word);
      });

      res.status(200).json(wordsPayload);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  },
};
