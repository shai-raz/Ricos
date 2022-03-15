const express = require("express")
const { authenticateToken } = require("../../services/auth")
const router = express.Router()
const postComment = require("../../services/Recipes/postComment")

router.post("/recipes/comments/post", authenticateToken, async function (req, res, next) {
    try {
        const uid = req.user.uid
        const rid = req.body.rid
        const content = req.body.content

        if (
            !uid ||
            !rid ||
            !content
        )
            res.json("You forgot to add something!")
        else
            res.json(
                await postComment.postComment(
                    uid,
                    rid,
                    content
                )
            )
    } catch (err) {
        console.error(`Error posting comment`, err.message)
        next(err)
    }
})

module.exports = router
