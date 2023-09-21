import {db} from "../database/database.connection.js"

export async function getGames(req, res){
    try{
        const games = await db.query (`SELECT * FROM games;`);
    }catch(err){
        res.status(500).send(err.message)
    }
}