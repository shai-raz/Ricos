import Post from "./Post"
import "../css/main.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_API_URL } from "../consts"
import Loading from "./Loading"

const Main = () => {
    const [recipes, setRecipes] = useState()
    const jwt = localStorage.getItem('jwt')

    useEffect(() => {
        const fetchRecipes = () => {
            axios
                .get(BASE_API_URL + "/users/main"
                    , {
                        headers: {
                            "Authorization": "Bearer " + jwt
                        }
                    })
                .then((res) => {
                    console.log(res.data.result)
                    setRecipes(res.data.result)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
        fetchRecipes()
    }, [jwt])

    return (
        <div className="main-container">
            {!recipes && <Loading />}
            {recipes?.length === 0 && "Couldn't find recipes"}
            {recipes?.map((recipe, i) => {
                return (
                    <Post
                        key={i}
                        title={recipe.title}
                        authorId={recipe.uid}
                        authorName={recipe.fullName}
                        profilePic={recipe.profilePic}
                        postId={recipe.rid}
                        img={recipe.img}
                        numOfLikes={recipe.numOfLikes}
                        description={recipe.description}
                        liked={recipe.liked}
                    />
                )
            })}
        </div>
    )
}

export default Main
