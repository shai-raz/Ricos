const express = require("express")
const { authenticateToken } = require("../../services/auth")

const router = express.Router()

router.get("/users/self/id", authenticateToken,
    async (req, res, next) => {
        try {
            res.json(req.user.uid)
        } catch (err) {
            console.error(`Error getting id`, err.message)
            next(err)
        }
    }
)

module.exports = router
