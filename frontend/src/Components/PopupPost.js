import { useEffect, useState } from 'react'
import '../css/popuppost.css'
import Comment from './Comment'
import ProfilePicture from './ProfilePicture'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEgg, faTimes, faUtensilSpoon, faXRa } from '@fortawesome/free-solid-svg-icons'
import { fetchComments, postComment } from '../helpers/Comments'

const PopupPost = (props) => {
    const [newCommentValue, setNewCommentValue] = useState("")
    const [comments, setComments] = useState()
    const recipe = props.recipe
    const postId = recipe.id
    const authorId = recipe.authorId
    const description = recipe.description
    const ingredients = recipe.ingredients
    const steps = recipe.steps
    const img = recipe.img
    const title = recipe.title
    const numOfLikes = recipe.numOfLikes
    const authorName = recipe.authorName
    //const numOfLikes = numOfLikesState ? numOfLikesState : props.numOfLikes
    //const liked = likedState ? likedState : (props.liked === 1)
    const jwt = localStorage.getItem('jwt') // move to context

    const hidePopup = () => {
        props.setVisible(false)
    }

    const onNewCommentChangeHandler = (e) => {
        setNewCommentValue(e.target.value)
    }

    const keyPressed = (e) => {
        if (e.keyCode === 13) {
            //alert("comment '" + event.target.value + "' on post #" + postId)
            postComment(postId, e.target.value, jwt)
                .then(res => {
                    if (res)
                        fetchComments(postId)
                            .then(res => {
                                setComments(res)
                            })
                            .catch(err => {
                                console.error(err)
                            })
                    else
                        alert("Error posting comment")
                }).catch(err => {
                    console.error(err)
                })
            setNewCommentValue("")
        }
    }

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget)
            hidePopup()
    }

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.keyCode === 27) // ESC
                hidePopup()
        }
        window.addEventListener('keydown', handleEsc)

        if (!comments)
            fetchComments(postId)
                .then((res) => {
                    setComments(res)
                }).
                catch((err) => {
                    console.error(err)
                })
    }, [comments])

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

                        <div className="popuppost-left-container-header-right">
                            <FontAwesomeIcon icon={faTimes} onClick={hidePopup} />
                        </div>


                    </div>
                    <div className="popuppost-left-container-post">
                        <div className="popuppost-left-container-post-description">
                            {description}
                        </div>
                        <div className="popuppost-left-container-post-img">
                            <img src={'data:image/png;base64, ' + img} alt="post" />
                        </div>


                        <div className="popuppost-left-container-post-ingredients">
                            <h3>Ingredients</h3>
                            <ul>
                                {ingredients.map((ingredient, i) => {
                                    return (
                                        <li key={i}>
                                            <span className="list-fontawesome-icon">
                                                <FontAwesomeIcon icon={faEgg} />
                                            </span>
                                            {ingredient.amount} {ingredient.unit} {ingredient.ingredient}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="popuppost-left-container-post-steps">
                            <h3>Steps</h3>
                            <ul>
                                {steps.map((step, i) => {
                                    return (
                                        <li key={i}>
                                            <span className="list-fontawesome-icon">
                                                <FontAwesomeIcon icon={faUtensilSpoon} />
                                            </span>
                                            {step}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="popuppost-right-container">
                    <div className="popuppost-comments-container">
                        {comments && comments.length > 0 && comments.map((comment, index) => {
                            return (
                                <Comment
                                    key={index}
                                    authorId={comment.uid}
                                    authorName={comment.fullName}
                                    profilePic={comment.profilePic}
                                    content={comment.content}
                                    withPfp={true}
                                />
                            )
                        })}

                        {/*<Comment authorName="Chen" authorId="6" content="nadirsrrrrrrrr" withPfp={true} />
                        <Comment authorName="Chen" authorId="3" content="nadirrrrrrrrr" withPfp={true} />*/}

                    </div>
                    <div className="popuppost-add-comment">
                        <input className="popuppost-add-comment-input"
                            type="text"
                            placeholder="Add a comment"
                            onChange={onNewCommentChangeHandler}
                            onKeyDown={keyPressed}
                            value={newCommentValue}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupPost