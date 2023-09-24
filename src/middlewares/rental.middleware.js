import { db } from "../database/database.connection.js"

export async function validateNewRental(req, res, next) {

    const rental = req.body;

    const customerExists = await db.query(`SELECT * FROM customers WHERE id=$1;`, [rental.customerId]);
    const gameExists = await db.query(`SELECT * FROM games WHERE id=$1;`, [rental.gameId]);

    if (customerExists.rowCount == 0 || gameExists.rowCount == 0) return res.status(400).send("Informações inválidas");

    const stock = await db.query(`SELECT "stockTotal" FROM games WHERE id=$1`, [rental.gameId]);
    const rented = await db.query(`SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL`, [rental.gameId]);

    if (stock.rows[0].stockTotal <= rented.rows.length) return res.status(400).send("Não disponível");

    res.locals.rental = { ...rental, pricePerDay: gameExists.rows[0].pricePerDay };

    next();
}

export async function validateReturn(req, res, next) {
    const { id } = req.params;

    const exist = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id]);
    if(exist.rows.length === 0) return res.status(404).send("Rental Id não existe")
    if(exist.rows[0].returnDate === 'NULL') return res.status(400).send("Aluguel já finalizado anteriormente");

    res.locals.id_return = id;

    next();
}