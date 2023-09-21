import { db } from "../database/database.connection.js"

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers;`)
        res.send(customers.rows)

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

        res.send(customer.rows[0]);
    }
    catch (err) {
        res.send(err.message)
    }

}

export async function createCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        const exist = await db.query(`SELECT * FROM customers WHERE cpf=$1;`, [cpf]);
        if (exist.rowCount !== 0) return res.status(409).send("CPF já cadastrado");

        await db.query(`INSERT INTO customers (name, phone, cpf, birthday)
        VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    }
    catch(err){
        res.send(err.message);
    }
}

export async function updateCustomer(req, res) {
    const {id} = req.params;
    const { name, phone, cpf, birthday } = req.body;

    try{
        const doubled = await db.query(`SELECT * FROM customers WHERE cpf=$1 AND id<>$2;`, [cpf, id]);
        if (doubled.rows !==0) return res.status(409).send("CPF pertence a outro usuário");

        await db.query(`UPDATE customers SET (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4) WHERE id=$5;`, [name, phone, cpf, birthday, id]);
        res.sendStatus(201);
    }
    catch(err){
        res.send(err.message);
    }
}