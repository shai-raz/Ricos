const db = require("../db")

async function createUser(username, password, salt, mail, firstName, lastName) {
  const result = await db.query(
    "INSERT INTO `Users`(`username`,`password`,`salt`,`mail`,`firstName`,`lastName`) VALUES(?, ?, ?, ?, ?, ?)",
    [username, password, salt, mail, firstName, lastName]
  )

  let message = "Error in creating post"

  if (result.affectedRows) {
    message = "Post created successfully"
  }

  return { message }
}

module.exports = {
  createUser,
}
