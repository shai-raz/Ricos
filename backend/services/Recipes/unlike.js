const db = require("../db")

async function unlikeRecipe(uid, rid) {
    const deleteQuery = "DELETE FROM RecipeLikes WHERE uid = ? and rid = ?"
    const deleteValues = [uid, rid]
    const updateQuery = "UPDATE Recipe SET numOfLikes = numOfLikes - 1 WHERE rid = ?"
    const updateValues = [rid]

    try {
        const transaction = await db.transaction([deleteQuery, updateQuery], [deleteValues, updateValues])

        if (transaction[0][0].affectedRows != 0 && transaction[1][0].affectedRows != 0)
            return true

    } catch (err) {
        console.log(err)
        return false
    }

    return false
}

module.exports = {
    unlikeRecipe,
}
