import {Router} from "express";
import gameSchema from "../schemas/games.schema.js";
import { getGames, createGames } from "../controllers/games.controllers.js";
import validateSchema from "../middlewares/validateSchema.middleware.js"
import validateNewGame from "../middlewares/game.middleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post ("/games", validateSchema(gameSchema), validateNewGame ,createGames)

export default gamesRouter;