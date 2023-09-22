import {Router} from "express";
import gameSchema from "../schemas/games.schema.js";
import { getGames, createGames } from "../controllers/games.controllers.js";
import validateSchema from "../middlewares/validateSchema.middleware.js"

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post ("/games", validateSchema(gameSchema),createGames)

export default gamesRouter;