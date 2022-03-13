const db = require("../db")

async function unfollowUser(followerId, followsId) {
    try {
        const deleteFollow = await db.query(
            "DELETE FROM `Follows` WHERE uid = ? and followerId = ?",
            [followsId, followerId]
        )

        const updateNumOfFollowersForFollowed = await db.query(
            "UPDATE `Users` SET `numOfFollowers` = `numOfFollowers` - 1 WHERE `uid` = ?",
            [followsId]
        )

        const updateNumOfFollowersForFollower = await db.query(
            "UPDATE `Users` SET `numOfFollowing` = `numOfFollowing` - 1 WHERE `uid` = ?",
            [followerId]
        )

        return deleteFollow.affectedRows != 0
            && updateNumOfFollowersForFollowed.affectedRows != 0
            && updateNumOfFollowersForFollower.affectedRows != 0

    } catch (err) {
        console.log(err)
        return false
    }
}

module.exports = {
    unfollowUser,
}
