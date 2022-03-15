function Recipe(id, authorId, authorName, profilePic, date, title, description, img, ingredients, steps, numOfLikes, liked = 0) {
    this.id = id
    this.authorId = authorId
    this.authorName = authorName
    this.profilePic = profilePic
    this.date = date
    this.title = title
    this.description = description
    this.img = img
    this.ingredients = JSON.parse(ingredients)
    this.steps = JSON.parse(steps)
    this.numOfLikes = numOfLikes
    this.liked = liked
}

export default Recipe