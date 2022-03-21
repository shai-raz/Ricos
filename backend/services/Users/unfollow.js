const db = require("../db")

async function unfollowUser(followerId, followeeId) {
    const deleteFollowQuery = "DELETE FROM `Follows` WHERE uid = ? and followerId = ?"
    const deleteFollowValues = [followeeId, followerId]

    const updateNumOfFollowersForFolloweeQuery = "UPDATE `Users` SET `numOfFollowers` = `numOfFollowers` - 1 WHERE `uid` = ?"
    const updateNumOfFollowersForFolloweeValues = [followeeId]

    const updateNumOfFollowingForFollowerQuery = "UPDATE `Users` SET `numOfFollowing` = `numOfFollowing` - 1 WHERE `uid` = ?"
    const updateNumOfFollowingForFollowerValues = [followerId]
    try {
        const transaction = await db.transaction([deleteFollowQuery, updateNumOfFollowersForFolloweeQuery, updateNumOfFollowingForFollowerQuery], [deleteFollowValues, updateNumOfFollowersForFolloweeValues, updateNumOfFollowingForFollowerValues])

        if (transaction[0][0].affectedRows != 0 && transaction[1][0].affectedRows != 0 && transaction[2][0].affectedRows != 0)
            return true
        
    } catch (err) {
        console.log(err)
        return false
    }

    return false
}

module.exports = {
    unfollowUser,
}
