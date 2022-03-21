const express = require("express")
const { authenticateToken } = require("../../services/auth")
const { unlikeRecipe } = require("../../services/Recipes/unlike")
const router = express.Router()
const Validator = require("jsonschema").Validator
const v = new Validator()

router.delete("/recipes/unlike", authenticateToken,
    async function (req, res, next) {
        try {
            const validation = v.validate(req.body, schema)

            if (validation.errors.length > 0) {
                const errors = validation.errors.map(error => error.stack)
                res.status(400).json(errors)
                return
            }

            const rid = req.body.rid
            const user = req.user

            if (!rid)
                res.status(400).send("Missing recipe id")
            else {
                await unlikeRecipe(user.uid, rid)
                    .then((result) => {
                        if (result)
                            res.sendStatus(200)
                        else
                            res.sendStatus(500)
                    })
            }
        } catch (err) {
            console.error(`Error unliking recipe`, err.message)
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
