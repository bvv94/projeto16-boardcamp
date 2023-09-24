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
    const { name, phone, cpf, birthday, id } = res.locals.customer;

    try {
        await db.query(`
            UPDATE customers 
                SET name=$1, phone=$2, birthday=$3, cpf=$4
                WHERE id=$5;
        `, [name, phone, birthday, cpf, id])
        res.sendStatus(200)
    }
    catch (err) {
        res.send(err.message);
    }
}