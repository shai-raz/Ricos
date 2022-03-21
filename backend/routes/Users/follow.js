const express = require("express")
const { authenticateToken } = require("../../services/auth")
const { followUser } = require("../../services/Users/follow")
const router = express.Router()
const Validator = require("jsonschema").Validator
const v = new Validator()

router.post("/users/follow", authenticateToken,
    async (req, res, next) => {
        try {
            const validation = v.validate(req.body, schema)

            if (validation.errors.length > 0) {
                const errors = validation.errors.map(error => error.stack)
                res.status(400).json(errors)
                return
            }

            const uid = req.body.uid
            const user = req.user
            if (user.uid == uid)
                res.status(400).send("User can't follow itself")
            else {
                await followUser(user.uid, uid)
                    .then((result) => {
                        if (result)
                            res.sendStatus(200)
                        else
                            res.sendStatus(500)
                    })
            }
        } catch (err) {
            console.error(`Error following user`, err.message)
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
