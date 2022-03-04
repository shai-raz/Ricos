const { hashPasswordWithSalt } = require("../../utils")
const db = require("../db")

async function checkUserLogin(usernameOrMail, password) {
  let salt = await db.query(
    "SELECT `salt` FROM `Users` WHERE `username` = ? OR `mail` = ?",
    [usernameOrMail, usernameOrMail]
  )

  salt = salt[0].salt
  const hashedPass = hashPasswordWithSalt(password, salt)

  const result = await db.query(
    "SELECT * FROM `Users` WHERE (username = ? OR mail = ?) AND password = ?",
    [usernameOrMail, usernameOrMail, hashedPass]
  )

  return result[0]
}

module.exports = {
  checkUserLogin,
}
