const router = require("express").Router();

const gameController = require("../controllers/gameController");

//CREATE GAME
router.post("/", async (req, res) => gameController.create(req, res));

//UPDATE GAME STATE
router.put("/:id", async (req, res) => gameController.update(req, res));

//DELETE GAME
router.delete("/:id", async (req, res) => gameController.delete(req, res));

//GET ALL GAMES
router.get("/", async (req, res) => gameController.getAll(req, res));

module.exports = router;
