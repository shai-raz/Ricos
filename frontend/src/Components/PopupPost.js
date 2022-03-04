import { useEffect } from 'react'
import '../css/popuppost.css'
import Comment from './Comment'
import ProfilePicture from './ProfilePicture'

const PopupPost = (props) => {
    const postId = props.postId
    const authorId = props.authorId
    const title = props.title
    const authorName = props.authorName
    const img = props.img
    //const numOfLikes = numOfLikesState ? numOfLikesState : props.numOfLikes
    const description = props.description
    //const liked = likedState ? likedState : (props.liked === 1)

    const keyPressed = (e) => {
        console.log(e.target, e.currentTarget)

    }

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget)
            props.setVisible(false)
    }

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.keyCode === 27) // ESC
            props.setVisible(false)
        }
        window.addEventListener('keydown', handleEsc)
    }, [props.setVisible])

    return (
        <div className="popuppost-container" onClick={handleOutsideClick}>
            <div className="popuppost-post-container">
                <div className="popuppost-left-container">
                    <div className="popuppost-left-container-header">
                        <div className="popuppost-left-container-header-left">
                            <div className="popuppost-header-profile-picture">
                                <ProfilePicture id={authorId} size="sm" isLink={true} />
                            </div>
                        </div>

                        <div className="popuppost-left-container-header-center">
                            <div className="post-recipe-title">
                                {title}
                            </div>
                            <div className="post-author">
                                <a href={"/profile/" + authorId}>
                                    {authorName}
                                </a>
                            </div>
                        </div>

                       
                    </div>
                </div>
                <div className="popuppost-right-container">
                    <div className="popuppost-comments-container">
                        <Comment authorName="Chen" authorId="6" content="nadirsrrrrrrrr" withPfp={true} />
                        <Comment authorName="Chen" authorId="3" content="nadirrrrrrrrr" withPfp={true} />

                    </div>
                    <div className="popuppost-add-comment">
                        <input className="popuppost-add-comment-input" type="text" placeholder="Add a comment"
                            onKeyDown={keyPressed}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupPost