const router = require("express").Router();

const gameController = require("../controllers/wordController");

//CREATE WORD
router.post("/", async (req, res) => gameController.create(req, res));

//DELETE WORD
router.delete("/:value", async (req, res) => gameController.delete(req, res));

//GET ALL WORDS
router.get("/", async (req, res) => gameController.getAll(req, res));

module.exports = router;
