import {db} from "../database/database.connection.js"

export default function validateCustomer(){
    try{

    }
    catch(err){
        res.status(400).send(err.message)
    }
}