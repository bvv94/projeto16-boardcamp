import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(`
            SELECT rentals.*, customers.id as customer_id, customers.name AS customer, games.id as game_id, games.name AS game
                FROM rentals
                JOIN customers ON rentals."customerId" = customers.id
                JOIN games ON rentals."gameId" = games.id
            `);

        const formattedRentals = rentals.rows.map(r => ({
            ...r,
            customer: {
                id: r.customer_id,
                name: r.customer
            },
            game: {
                id: r.game_id,
                name: r.game
            }
        }));

        res.send(formattedRentals);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

export async function createRentals(req, res) {

    const { customerId, gameId, daysRented, pricePerDay } = res.locals.rental;

    try {

        const originalPrice = daysRented * pricePerDay;

        await db.query(`INSERT INTO rentals 
                        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                        VALUES ($1, $2, NOW(), $3, null, $4, null)`,
            [customerId, gameId, daysRented, originalPrice])
        res.sendStatus(201)
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

export async function returnRental(req, res) {

    const { id } = res.locals.id_return;

    try {
        // const getRent = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id]);
        await db.query(`UPDATE rentals SET returnDate = NOW() WHERE id=$1`, [id]);

        res.sendStatus(200)
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteRental() {
    try {

    }
    catch (err) {
        res.status(500).send(err.message);
    }
}