const db = require("../db")

async function followUser(followerId, followeeId) {
    const insertFollowQuery = "INSERT INTO `Follows`(`uid`,`followerId`,`date`) VALUES(?, ?, ?)"
    const insertFollowValues = [followeeId, followerId, "CURRENT_TIMESTAMP"]

    const updateFollowersForFolloweeQuery = "UPDATE `Users` SET `numOfFollowers` = `numOfFollowers` + 1 WHERE `uid` = ?"
    const updateFollowersForFolloweeValues = [followeeId]

    const updateNumOfFollowingForFollowerQuery = "UPDATE `Users` SET `numOfFollowing` = `numOfFollowing` + 1 WHERE `uid` = ?"
    const updateNumOfFollowingForFollowerValues = [followerId]

    try {
        const transaction = await db.transaction([insertFollowQuery, updateFollowersForFolloweeQuery, updateNumOfFollowingForFollowerQuery], [insertFollowValues, updateFollowersForFolloweeValues, updateNumOfFollowingForFollowerValues])

        if (transaction[0][0].affectedRows != 0 && transaction[1][0].affectedRows != 0 && transaction[2][0].affectedRows != 0)
            return true
        
    } catch (err) {
        console.log(err)
        return false
    }

    return false
}

module.exports = {
    followUser,
}
