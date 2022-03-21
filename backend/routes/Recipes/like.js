const express = require("express")
const { authenticateToken } = require("../../services/auth")
const { likeRecipe } = require("../../services/Recipes/like")
const router = express.Router()
const Validator = require("jsonschema").Validator
const v = new Validator()

router.post("/recipes/like", authenticateToken,
    async function (req, res, next) {
        try {
            const validation = v.validate(req.body, schema)

            if (validation.errors.length > 0) {
                const errors = validation.errors.map(error => error.stack)
                res.status(400).json(errors)
                return
            }

            const rid = req.body.rid
            const uid = req.user.uid

            if (!rid)
                res.status(400).send("Missing recipe id")
            else
                await likeRecipe(rid, uid)
                    .then((result) => {
                        if (result)
                            res.sendStatus(200)
                        else
                            res.sendStatus(500)
                    }).catch((err) => {
                        console.log(err)
                        res.sendStatus(500)
                    })
        } catch (err) {
            console.error('Error liking recipe', err.message)
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
        }
    },
    "required": ["rid"]
}

module.exports = router
