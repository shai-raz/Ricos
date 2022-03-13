function Recipe(id, authorId, date, title, description, img, ingredients, steps, numOfLikes) {
    this.id = id
    this.authorId = authorId
    this.date = date
    this.title = title
    this.description = description
    this.img = img
    this.ingredients = JSON.parse(ingredients)
    this.steps = JSON.parse(steps)
    this.numOfLikes = numOfLikes
}

export default Recipe