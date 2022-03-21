const express = require("express")
const { authenticateToken } = require("../../services/auth")
const router = express.Router()
const postComment = require("../../services/Recipes/postComment")
const Validator = require("jsonschema").Validator
const v = new Validator()

router.post("/recipes/comments/post", authenticateToken, async function (req, res, next) {
    try {
        const validation = v.validate(req.body, schema)

        if (validation.errors.length > 0) {
            const errors = validation.errors.map(error => error.stack)
            res.status(400).json(errors)
            return
        }

        const uid = req.user.uid
        const rid = req.body.rid
        const content = req.body.content

        await postComment.postComment(
            uid,
            rid,
            content
        ).then((result) => {
            if (result)
                res.sendStatus(200)
            else
                res.sendStatus(500)
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    } catch (err) {
        console.error(`Error posting comment`, err.message)
        next(err)
    }
})

const schema = {
    "type": "object",
    "properties": {
        "rid": {
            "type": ["string", "integer"],
            "minLength": 1,
            "minimum": 1
        },
        "content": {
            "type": "string",
            "minLength": 1
        }
    },
    "required": ["rid", "content"]
}

module.exports = router
