import { db } from "../database/database.connection.js"

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(`SELECT rentals.*, customers.name AS customer_name, games.name AS game_name
                                        FROM rentals
                                        JOIN customers ON rentals."customerId"=customers.id
                                        JOIN games ON rentals."gameId"=games.id`)

        const print = rentals.rows.map(r => ({
            id: r.id,
            customerId: r.customerId,
            gameId: r.gameId,
            rentDate: r.rentDate,
            daysRented: r.daysRented,
            returnDate: r.returnDate,
            originalPrice: r.originalPrice,
            delayFee: r.delayFee,
            customer: {
                id: r.customerId,
                name: r.customer_name
            },
            game: {
                id: r.gameId,
                name: r.game_name
            }
        }))

        res.send(print)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body

    try {
        const existCustomer = await db.query(`SELECT * FROM customers WHERE id=$1`, [customerId])
        const existGame = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId])
        if ((existCustomer.rows.length === 0) || (existGame.rows.length === 0)) return res.sendStatus(400)

        //Validar se há jogos disponíveis
        const stock = await db.query(`SELECT "stockTotal" FROM games WHERE id=$1`, [gameId])
        const rented = await db.query(`SELECT * FROM rentals WHERE "gameId"=$1`, [gameId])

        if (stock.rows[0].stockTotal <= rented.rows.length) return res.sendStatus(400)

        const pricePerDay = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId])
        const originalPrice = daysRented * (pricePerDay.rows[0].pricePerDay)

        await db.query(`INSERT INTO rentals 
                        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                        VALUES ($1, $2, NOW(), $3, null, $4, null)`,
            [customerId, gameId, daysRented, originalPrice])
        res.sendStatus(201)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function returnRental(req, res) {
    const { id } = req.params

    try {
        const exist = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
        if (exist.rowCount === 0) return res.sendStatus(404) //se id de aluguel existe

        const date = new Date()
        
        console.log(exist.rows[0])
        if (exist.rows[0].returnDate !== null) return res.sendStatus(400) //aluguel já finalizado

        // const returnDate = new Date(exist.rows[0].returnDate)
        // const rentDate = new Date (exist.rows[0].rentDate)
        // const daysLate = Math.ceil((date - returnDate) / (1000 * 60 * 60 * 24))
        // const rentedDays = Math.ceil((returnDate - rentDate) / (1000 * 60 * 60 * 24))
        // const pricePerDay = exist.rows[0].pricePerDay
        // const delayFee = daysLate > 0 ? daysLate * pricePerDay : 0

        // await db.query(`UPDATE rentals SET "returnDate" = $1, "delayFee"=$2 WHERE id=$3`, [date, delayFee, id])
        await db.query(`UPDATE rentals SET "returnDate" = $1 WHERE id=$2`, [date, id])

        res.sendStatus(200)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params

    try {
        const exist = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
        if (exist.rowCount === 0) return res.sendStatus(404) //se id de aluguel existe
        if (exist.rows[0].returnDate === null) return res.sendStatus(400) //aluguel não está finalizado

        await db.query(`DELETE FROM rentals WHERE id=$1`, [id])

        res.sendStatus(200)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}