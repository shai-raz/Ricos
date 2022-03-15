import Post from "./Post"
import "../css/main.css"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { BASE_API_URL } from "../consts"
import Loading from "./Loading"
import Recipe from '../helpers/Recipe';

const Main = () => {
    const [recipes, setRecipes] = useState()
    const jwt = localStorage.getItem('jwt')

    const fetchRecipes = () => {
        axios
            .get(BASE_API_URL + "/users/main"
                , {
                    headers: {
                        "Authorization": "Bearer " + jwt
                    }
                })
            .then((res) => {
                //console.log(res.data.result)
                const newRecipes = res.data.result.map(
                    recipe => {
                        return new Recipe(
                            recipe['rid'],
                            recipe['uid'],
                            recipe['fullName'],
                            recipe['profilePic'],
                            recipe['date'],
                            recipe['title'],
                            recipe['description'],
                            recipe['img'],
                            recipe['ingredients'],
                            recipe['steps'],
                            recipe['numOfLikes'],
                            recipe['liked']
                        )
                    })
                setRecipes(newRecipes)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        if (!recipes)
            fetchRecipes()
        
        recipes && console.log(JSON.parse(JSON.stringify(recipes)))
    }, [jwt, recipes])

    return (
        <div className="main-container">
            {!recipes && <Loading />}
            {recipes?.length === 0 && "Couldn't find any recipes"}
            {recipes?.map((recipe, i) => {
                return (
                    <Post
                        key={i}
                        recipe={recipe}
                    />
                )
            })}
        </div>
    )
}

export default Main
