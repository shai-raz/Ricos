const express = require("express")
const { authenticateToken } = require("../../services/auth")
const router = express.Router()
const postRecipe = require("../../services/Recipes/postRecipe")
const Validator = require("jsonschema").Validator
const v = new Validator()

router.post("/recipes/post", authenticateToken, async function (req, res, next) {
  try {
    const validation = v.validate(req.body, schema)

    if (validation.errors.length > 0) {
      const errors = validation.errors.map(error => error.stack)
      res.status(400).json(errors)
      return
    }

    const uid = req.user.uid
    const date = new Date()
    const title = req.body.title
    const description = req.body.description
    const img = req.body.img
    const ingredients = req.body.ingredients
    const steps = req.body.steps

    res.json(
      await postRecipe.createRecipe(
        uid,
        date,
        title,
        description,
        img,
        ingredients,
        steps
      ).then((result) => {
        if (result)
          res.sendStatus(200)
        else
          res.sendStatus(500)
      }).catch(err => {
        console.log(err)
        res.sendStatus(500)
      })
    )
  } catch (err) {
    console.error('Error posting recipe', err.message)
    next(err)
  }
})

const schema = {
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "minLength": 1
    },
    "img": {
      "type": "string",
      "minLength": 1
    },
    "ingredients": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "properties": {
          "amount": {
            "type": ["string", "integer"],
            "minimum:": 1,
            "minLength": 1
          },
          "unit": {
            "type": "string",
            "minLength": 1
          },
          "ingredient": {
            "type": "string",
            "minLength": 1
          }
        },
        "required": ["amount", "unit", "ingredient"]
      }
    },
    "steps": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": ["string", "integer"],
        "minimum": 1,
        "minLength": 1
      }
    },
  },
  "required": ["title", "description", "img", "ingredients", "steps"]
}

module.exports = router
