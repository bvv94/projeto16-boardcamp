import { db } from "../database/database.connection.js"

export async function validateCustomer(req, res, next) {

    const customer = req.body;

    const exist = await db.query(`SELECT * FROM customers WHERE cpf=$1;`, [customer.cpf]);
    if (exist.rowCount !== 0) return res.status(409).send("CPF já cadastrado");

    res.locals.customer = customer;

    next();
}

export async function validateUpdate(req, res, next) {

    const customer = req.body;
    const { id } = req.params;

    try {
        const existingCustomer = await db.query(`SELECT * FROM customers WHERE cpf=$1;`, [customer.cpf]);

        if (existingCustomer.rowCount > 0 && existingCustomer.rows[0].id !== id) {
            return res.status(409).send("CPF já cadastrado");
        }

        res.locals.customer = customer;
        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}