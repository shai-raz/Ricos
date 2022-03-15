const db = require("../db")

async function postComment(uid, rid, content) {
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

    return { message }
}

module.exports = {
    postComment,
}