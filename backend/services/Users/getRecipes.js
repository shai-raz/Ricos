const db = require("../db")

/* Get all recipes a user has posted */
async function getRecipes(uid) {
  const result = await db.query(
    "SELECT R.*, CONCAT_WS(' ', U.firstName, U.lastName) as fullName, U.profilePic \
      FROM `Recipe` R \
      LEFT JOIN `Users` U ON U.uid = R.uid \
      WHERE R.uid = ?",
    [uid]
  )

  return { result }
}

module.exports = {
  getRecipes,
}
