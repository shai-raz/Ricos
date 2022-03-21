const mysql = require("mysql2/promise")
const config = require("../config")
const pool = mysql.createPool(config.db)

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params)

  return rows
}

async function transaction(queries, queryValues) {
  if (queries.length !== queryValues.length) {
    return Promise.reject(
      'Number of provided queries did not match the number of provided query values arrays'
    )
  }
  const connection = await mysql.createConnection(config.db)
  try {
    await connection.beginTransaction()
    const queryPromises = []

    queries.forEach((query, index) => {
      queryPromises.push(connection.query(query, queryValues[index]))
    })
    const results = await Promise.all(queryPromises)
    await connection.commit()
    await connection.end()
    return results
  } catch (err) {
    await connection.rollback()
    await connection.end()
    return Promise.reject(err)
  }
}

module.exports = {
  query,
  transaction,
  mysql,
  config,
  pool
}
