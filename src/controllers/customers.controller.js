import { db } from "../database/database.connection.js"
import moment from "moment";

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT id, name, phone, cpf, birthday FROM customers;`)

        const formattedCustomers = customers.rows.map(customer => ({
            id: customer.id,
            name: customer.name,
            phone: customer.phone,
            cpf: customer.cpf,
            birthday: moment(customer.birthday).format('YYYY-MM-DD')
        }));

        res.send(formattedCustomers)

    } catch (err) {
        res.send(err.message)
    }
}

export async function getIdCustomer(req, res) {
    const { id } = req.params;

    try {
        const customer = await db.query(`SELECT id, name, phone, cpf, birthday
                        FROM customers WHERE id=$1;`, [id]);
        if (customer.rowCount === 0) return res.sendStatus(404);
        
        const formattedCustomer = {
            id: customer.rows[0].id,
            name: customer.rows[0].name,
            phone: customer.rows[0].phone,
            cpf: customer.rows[0].cpf,
            birthday: moment(customer.rows[0].birthday).format('YYYY-MM-DD')
        };

        // res.send(customer)
        res.send(formattedCustomer)
    }
    catch (err) {
        res.send(err.message)
    }

}

export async function createCustomer(req, res) {
    const { name, phone, cpf, birthday } = res.locals.customer;

    try {
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday)
        VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    }
    catch (err) {
        res.send(err.message);
    }
}

export async function updateCustomer(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    try {
        const doubled = await db.query(`SELECT * FROM customers WHERE cpf=$1 AND id<>$2;`, [cpf, id]);
        if (doubled.rows !== 1) return res.status(409).send("CPF pertence a outro usuário");

        await db.query(`UPDATE customers SET (name, phone, cpf, birthday) 
                        VALUES ($1, $2, $3, $4) WHERE id=$5;`, [name, phone, cpf, birthday, id]);
        res.sendStatus(201);
    }
    catch (err) {
        res.send(err.message);
    }
}