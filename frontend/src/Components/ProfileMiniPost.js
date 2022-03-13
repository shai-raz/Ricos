import { useState } from 'react'
import PopupPost from './PopupPost'
import '../css/profileminipost.css'


const ProfileMiniPost = (props) => {
    const [popupPostVisible, setPopupPostVisible] = useState(false)

    const recipe = props.recipe
    const postId = recipe.id
    const authorId = recipe.uid
    const description = recipe.description
    const img = recipe.img
    const title = recipe.title
    const numOfLikes = recipe.numOfLikes
    const authorName = props.authorName
    //const numOfLikes = numOfLikesState ? numOfLikesState : props.numOfLikes

    return (
        <div className="profile-mini-post-container" >
            <div onClick={() => { setPopupPostVisible(true) }}>
                <div className="profile-mini-post-img-container" >
                    <img
                        className="profile-mini-post-img"
                        src={'data:image/png;base64, ' + img}
                        alt="recipe" />
                </div>

                <div className="profile-mini-post-footer">
                    <div className="profile-mini-post-title">
                        {title}
                    </div>
                    <div className="profile-mini-post-description">
                        {description}
                    </div>
                </div>
            </div>
            {popupPostVisible
                &&
                <PopupPost
                    recipe={recipe}
                    authorName={authorName}
                    setVisible={setPopupPostVisible} />
            }
        </div>
    )
}

export default ProfileMiniPost