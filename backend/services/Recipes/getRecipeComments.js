const db = require("../db")

async function getRecipeComments(rid) {
    const result = await db.query(
        "SELECT C.*, COR.*, CONCAT_WS(' ', U.firstName, U.lastName) as fullName, U.profilePic \
        FROM `Comment` C \
        JOIN `CommentsOnRecipes` COR ON C.cid=COR.cid \
        JOIN `Users` U ON U.uid=COR.uid \
        WHERE rid = ? \
        ORDER BY C.cid",
        [rid]
    )

    return { result }
}

module.exports = {
    getRecipeComments,
}
