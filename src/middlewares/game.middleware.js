import { db } from "../database/database.connection.js"

export default async function validateNewGame(req, res, next) {

    const { name } = req.body;

    const games = await db.query(`SELECT * FROM games;`);
    const exists = games.rows.find((g) => g.name === name)
    if (exists) return res.status(409).send("Jogo já cadastrado")

    res.locals.game = req.body;

    next();
}