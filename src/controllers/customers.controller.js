import {db} from "../database/database.connection.js"

export async function getCustomers (req, res){
    try{
        const customers = await db.query (`SELECT * FROM customers;`)
        res.send(customers.rows)

    } catch(err) {
        res.status(500).send(err.message)
    }
}