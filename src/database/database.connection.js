import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg

const configDatabase = {
    connectionString: process.env.DATABASE_URL
}

// if (process.env.NODE_ENV === "production") configDatabase.ssl = true; /* essa linha não está n aaula de hj 20/09*/

export const db = new Pool(configDatabase)