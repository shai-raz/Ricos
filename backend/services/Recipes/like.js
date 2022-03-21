const db = require("../db")

async function likeRecipe(rid, uid) {
    const insertQuery = "INSERT INTO `RecipeLikes`(`uid`, `rid`) VALUES(?, ?)"
    const insertValues = [uid, rid]
    
    const updateQuery = "UPDATE Recipe SET numOfLikes = numOfLikes + 1 WHERE rid = ?"
    const updateValues = [rid]

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
    likeRecipe,
}
