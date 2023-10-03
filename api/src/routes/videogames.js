const { Router } = require("express");
const router = Router();
const { getVideogames, getVideogameById, getGamesByName } = require("../controllers/getVideogames");
const { newGame } = require("../controllers/postGames");

router.get("/name", getGamesByName);
router.get("/:id", getVideogameById);
router.get("/", getVideogames);
router.post("/", newGame);

module.exports = router;
