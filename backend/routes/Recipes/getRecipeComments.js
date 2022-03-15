const express = require("express")
const router = express.Router()
const getRecipeComments = require("../../services/Recipes/getRecipeComments")

router.get("/recipes/comments/get/:rid", async function (req, res, next) {
    try {
        const rid = req.params.rid

        if (!rid) res.json("You forgot to add something!")
        else res.json(await getRecipeComments.getRecipeComments(rid))
    } catch (err) {
        console.error("Error getting recipe comments", err.message)
        next(err)
    }
})

module.exports = router
