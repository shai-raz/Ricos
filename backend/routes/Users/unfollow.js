const express = require("express")
const { authenticateToken } = require("../../services/auth")
const { unfollowUser } = require("../../services/Users/unfollow")
const router = express.Router()
const Validator = require("jsonschema").Validator
const v = new Validator()

router.delete("/users/unfollow", authenticateToken,
    async function (req, res, next) {
        try {
            const validation = v.validate(req.body, schema)

            if (validation.errors.length > 0) {
                const errors = validation.errors.map(error => error.stack)
                res.status(400).json(errors)
                return
            }

            const uid = req.body.uid
            const user = req.user
            await unfollowUser(user.uid, uid)
                .then((result) => {
                    if (result)
                        res.sendStatus(200)
                    else
                        res.sendStatus(500)
                })
        } catch (err) {
            console.error(`Error unfollowing user`, err.message)
            next(err)
        }
    })

const schema = {
    "type": "object",
    "properties": {
        "uid": {
            "type": ["string", "integer"],
            "minLength": 1,
            "minimum": 1
        }
    },
    "required": ["uid"]
}

module.exports = router
