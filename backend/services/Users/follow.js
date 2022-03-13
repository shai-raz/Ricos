const db = require("../db")

async function followUser(followerId, followsId) {
    try {
        const insertFollow = await db.query(
            "INSERT INTO `Follows`(`uid`,`followerId`,`date`) VALUES(?, ?, ?)",
            [followsId, followerId, "CURRENT_TIMESTAMP"]
        )

        const updateNumOfFollowersForFollowed = await db.query(
            "UPDATE `Users` SET `numOfFollowers` = `numOfFollowers` + 1 WHERE `uid` = ?",
            [followsId]
        )

        const updateNumOfFollowersForFollower = await db.query(
            "UPDATE `Users` SET `numOfFollowing` = `numOfFollowing` + 1 WHERE `uid` = ?",
            [followerId]
        )

        return insertFollow.affectedRows != 0
            && updateNumOfFollowersForFollowed.affectedRows != 0
            && updateNumOfFollowersForFollower.affectedRows != 0

    } catch (err) {
        console.log(err)
        return false
    }
}

module.exports = {
    followUser,
}
