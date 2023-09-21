import {Router} from "express";
import customersRouter from "./customers.routes";
import rentalsRouter from "./rentals.routes";
import gamesRouter from "./games.routes";

const router = Router();

router.use(customersRouter);
router.use(gamesRouter);
router.use(rentalsRouter);

export default router;