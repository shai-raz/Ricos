import { useState } from 'react';
import PopupPost from './PopupPost';
import '../css/profileminipost.css'


const ProfileMiniPost = (props) => {
    const [popupPostVisible, setPopupPostVisible] = useState(false)

    const postId = props.postId
    const authorId = props.authorId
    const authorName = props.authorName
    const description = props.description
    const img = props.img
    const title = props.title
    const numOfLikes =props.numOfLikes
    //const numOfLikes = numOfLikesState ? numOfLikesState : props.numOfLikes

    return (
        <div className="profile-mini-post-container" >
            <div onClick={() => { setPopupPostVisible(true) }}>
                <div className="profile-mini-post-img-container" >
                    <img className="profile-mini-post-img" src={img} alt="recipe" />
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
                    title={title}
                    authorId={authorId}
                    authorName={authorName}
                    postId={postId}
                    img={img}
                    numOfLikes={numOfLikes}
                    description={description}
                    setVisible={setPopupPostVisible} />
            }
        </div>
    )
}

export default ProfileMiniPost