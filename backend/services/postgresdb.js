require("dotenv").config()
const { Pool, Client } = require('pg')

/*const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})
client.connect()*/

const pool = new Pool()

const query = async (sql, params) => {
    const { rows } = await pool.query(sql, params)
    console.log(rows)
    return rows
}

module.exports = {
    query
}