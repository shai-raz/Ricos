const db = require("../db")

async function createRecipe(uid, date, title, desc, img, ingredients, steps) {
  const insertRecipe = await db.query(
    "INSERT INTO `Recipe`(`uid`, `date`, `title`, `description`, `img`, `ingredients`, `steps`) VALUES(?, ?, ?, ?, ?, ?, ?)",
    [uid, date, title, desc, img, ingredients, steps]
  )

  const updateNumOfRecipes = await db.query(
    "UPDATE `Users` SET `numOfRecipes` = `numOfRecipes` + 1 WHERE `uid` = ?",
    [uid]
  )

  let message = "Error creating recipe"

  if (insertRecipe.affectedRows && updateNumOfRecipes.affectedRows) {
    message = "Recipe created successfully"
  }

  return { message }
}

module.exports = {
  createRecipe,
}
