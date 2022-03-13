import { useEffect } from 'react'
import '../css/popuppost.css'
import Comment from './Comment'
import ProfilePicture from './ProfilePicture'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEgg, faHamburger, faTimes, faUtensils, faUtensilSpoon, faXRay } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-regular-svg-icons'

const PopupPost = (props) => {
    const recipe = props.recipe
    const postId = recipe.id
    const authorId = recipe.uid
    const description = recipe.description
    const ingredients = recipe.ingredients
    const steps = recipe.steps
    const img = recipe.img
    const title = recipe.title
    const numOfLikes = recipe.numOfLikes
    const authorName = props.authorName
    //const numOfLikes = numOfLikesState ? numOfLikesState : props.numOfLikes
    //const liked = likedState ? likedState : (props.liked === 1)

    const hidePopup = () => {
        props.setVisible(false)
    }

    const keyPressed = (e) => {
        console.log(e.target, e.currentTarget)
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