const db = require("../db")

async function postComment(uid, rid, content) {
    const insertCommentQuery = "INSERT INTO `Comment`(`content`) VALUES(?)"
    const insertCommentValues = [content]
    const insertCommentOnRecipeQuery = "INSERT INTO `CommentsOnRecipes`(`uid`, `rid`, `cid`) VALUES(?, ?, ?)"
    const insertCommentOnRecipeValues = [uid, rid]

    // since we need to use the inserted id in the second query,
    // create a custom transaction

    try {
        const connection = await db.mysql.createConnection(db.config.db)
        try {
            await connection.beginTransaction()

            const insertComment = await connection.query(insertCommentQuery, insertCommentValues)
            const insertCommentOnRecipe = await connection.query(insertCommentOnRecipeQuery,
                [...insertCommentOnRecipeValues, insertComment[0].insertId])

            await connection.commit()
            await connection.end()
            return true
        } catch (err) {
            await connection.rollback()
            await connection.end()
            console.error("rolling back, error in postComment", err.message)
            return false
        }
    } catch (err) {
        console.error(err)
        return false
    }

    /*
        const insertComment = await db.query(
            "INSERT INTO `Comment`(`content`) VALUES(?)",
            [content]
        )
    
        const insertCommentOnRecipe = await db.query(
            "INSERT INTO `CommentsOnRecipes`(`uid`, `rid`, `cid`) VALUES(?, ?, ?)",
            [uid, rid, insertComment.insertId]
        )
    
        let message = "Error posting comment"
    
        if (insertComment.affectedRows && insertCommentOnRecipe.affectedRows) {
            message = "Comment posted successfully"
        }
    
        return { message }*/
}

module.exports = {
    postComment,
}