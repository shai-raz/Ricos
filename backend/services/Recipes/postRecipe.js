const db = require("../db")

async function createRecipe(uid, date, title, desc, img, ingredients, steps) {
  const insertQuery = "INSERT INTO `Recipe`(`uid`, `date`, `title`, `description`, `img`, `ingredients`, `steps`) VALUES(?, ?, ?, ?, ?, ?, ?)"
  const insertValues = [uid, date, title, desc, img, ingredients, steps]
  
  const updateQuery = "UPDATE `Users` SET `numOfRecipes` = `numOfRecipes` + 1 WHERE `uid` = ?"
  const updateValues = [uid]

  try {
    const transaction = await db.transaction([insertQuery, updateQuery], [insertValues, updateValues])

    if (transaction[0][0].affectedRows != 0 && transaction[1][0].affectedRows != 0)
      return true
      
  } catch (err) {
    console.log(err)
    return false
  }

  return false
}

module.exports = {
  createRecipe,
}
