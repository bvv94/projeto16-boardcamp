import { db } from "../database/database.connection.js"

export async function validateCustomer(req, res, next) {

    const customer = req.body;

    const exist = await db.query(`SELECT * FROM customers WHERE cpf=$1;`, [customer.cpf]);
    if (exist.rowCount !== 0) return res.status(409).send("CPF já cadastrado");

    res.locals.customer = customer;

    next();
}