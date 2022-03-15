require("dotenv").config()
const env = process.env

const express = require("express")
const cors = require("cors")
const port = env.PORT || 8000

/* Recipes */
const getRecipeRouter = require("./routes/Recipes/getRecipe")
const getRecipeCommentsRouter = require("./routes/Recipes/getRecipeComments")
const postRecipeRouter = require("./routes/Recipes/postRecipe")
const postLikeRecipeRouter = require("./routes/Recipes/like")
const deleteUnlikeRecipeRouter = require("./routes/Recipes/unlike")
const postCommentRouter = require("./routes/Recipes/postComment")

/* Users */
/* user that currently is browsing */
const getSelfUserIdRouter = require("./routes/Users/getSelfUserId")

/* other users */
const getUserRecipesRouter = require("./routes/Users/getRecipes")
const getUserMainRecipesRouter = require("./routes/Users/getMainRecipes")
const getUserRouter = require("./routes/Users/getUser")
const getCheckUserLoginRouter = require("./routes/Users/checkUserLogin")
const postUserRouter = require("./routes/Users/postUser")
const postFollowUserRouter = require("./routes/Users/follow")
const deleteUnfollowUserRouter = require("./routes/Users/unfollow")


const app = express()
app.use(cors())
app.use(express.json(
  {
    limit: "50mb"
  }
))
app.use(express.urlencoded({ extended: false }))

/* Recipes */
// /recipes/get/:rid
app.use(getRecipeRouter)
// /recipes/comments/get/:rid
app.use(getRecipeCommentsRouter)
// /recipes/post
app.use(postRecipeRouter)
// /recipes/like
app.use(postLikeRecipeRouter)
// /recipes/unlike
app.use(deleteUnlikeRecipeRouter)
// /recipes/comments/post
app.use(postCommentRouter)

/* Users */
/* user that currently is browsing */
app.use(getSelfUserIdRouter)

/* other users */
// /users/:uid/recipes
app.use(getUserRecipesRouter)
// /users/:uid/main
app.use(getUserMainRecipesRouter)
// /users/:uid
app.use(getUserRouter)
// /users/login
app.use(getCheckUserLoginRouter)
// /users/post
app.use(postUserRouter)
// /users/follow
app.use(postFollowUserRouter)
// /users/unfollow
app.use(deleteUnfollowUserRouter)

app.listen(port, () => {
  console.log("Server is Listening")
})

module.exports = app
