import '../css/post.css'
import ProfilePicture from './ProfilePicture'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faPaperPlane, faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons'
import { } from '@fortawesome/free-regular-svg-icons'
import { faEllipsisV, faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons'
import { Menu, MenuItem } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import Comment from './Comment'
import axios from 'axios'
import { BASE_API_URL, UNFOLLLOW_API_URL } from '../consts'
import { useState, useEffect } from 'react'
import PopupPost from './PopupPost'
import { fetchComments, postComment } from '../helpers/Comments'
import { formatDistance } from 'date-fns'

const MAX_COMMENTS = 3

const Post = (props) => {
    const recipe = props.recipe
    console.log(recipe)

    const [liked, setLikedState] = useState(recipe.liked === 1) // true if liked by current user
    const [numOfLikes, setNumOfLikesState] = useState(recipe.numOfLikes)
    const [popupPostVisible, setPopupPostVisible] = useState(false)
    const [comments, setComments] = useState()

    const postId = recipe.id
    const authorId = recipe.authorId
    const title = recipe.title
    const authorName = recipe.authorName
    const img = recipe.img
    const profilePic = recipe.profilePic
    const description = recipe.description
    const date = new Date(recipe.date)
    const dateDiff = formatDistance(date, new Date(), { addSuffix: true })

    const jwt = localStorage.getItem('jwt')

    const headers = {
        "Authorization": "Bearer " + jwt,
    }

    useEffect(() => {
        if (!comments)
            fetchComments(postId)
                .then((res) => {
                    setComments(res)
                })
                .catch((err) => {
                    console.error(err)
                })

    }, [comments])

    const like = () => {
        if (!liked) { // like
            axios
                .post(BASE_API_URL + "/recipes/like", { rid: postId }, { headers })
                .then((res) => {
                    if (res.status === 200) {
                        console.log("liked post " + postId)
                        setNumOfLikesState(numOfLikes + 1)
                        setLikedState(true)
                    } else
                        console.error("error liking post " + postId)
                }).catch((err) => {
                    console.error(err)
                })
        } else { // unlike
            const data = {
                rid: postId
            }
            axios
                .delete(BASE_API_URL + "/recipes/unlike", { data, headers })
                .then((res) => {
                    if (res.status === 200) {
                        console.log("unliked post " + postId)
                        setNumOfLikesState(numOfLikes - 1)
                        setLikedState(false)
                    } else
                        console.error("error unliking post " + postId)
                }).catch((err) => {
                    console.error(err)
                })
        }

    }

    const showComments = () => {
        alert("comment post #" + postId)
    }

    const share = () => {
        alert("share post #" + postId)
    }

    const unfollow = () => {
        const data = {
            uid: authorId
        }
        axios
            .delete(UNFOLLLOW_API_URL, { data, headers })
            .then((res) => {
                if (res.status === 200)
                    alert(`Unfollowed ${authorName} successfully`)
                else
                    alert(`Error unfollowing ${authorName}`)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const reportPost = () => {
        alert("report post #" + postId)
    }

    const keyPressed = (event) => {
        if (event.keyCode === 13) {
            postComment(postId, event.target.value, jwt)
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
            event.target.value = ''
        }
    }

    return (
        <div className="post-container">

            <div className="post-header">
                <div className="post-header-left">
                    <div className="post-profile-picture">
                        <ProfilePicture
                            id={authorId}
                            size="sm"
                            isLink={true}
                            imgUrl={profilePic} />
                    </div>
                </div>

                <div className="post-header-center">
                    <div className="post-recipe-title" onClick={() => { setPopupPostVisible(true) }}>
                        {title}
                    </div>
                    <div className="post-author">
                        <a href={"/profile/" + authorId}>
                            {authorName}
                        </a>
                    </div>
                </div>

                <div className="post-header-right">
                    <Menu menuButton={<button className="dropdown-menu-button"><FontAwesomeIcon icon={faEllipsisV} /></button>}>
                        <MenuItem onClick={unfollow}>Unfollow</MenuItem>
                        <MenuItem onClick={reportPost} styles={{ color: 'red' }}>Report</MenuItem>
                        {/*<SubMenu label="Open">
                            <MenuItem>index.html</MenuItem>
                        </SubMenu>*/}
                    </Menu>

                </div>
            </div>

            <div className="post-body">
                <div className="post-img-container" onClick={setPopupPostVisible}>
                    <img className="post-img"
                        src={'data:image/png;base64, ' + img}
                        alt="recipe" />
                </div>
            </div>

            <div className="post-footer">
                <div className="post-actions">
                    <FontAwesomeIcon icon={liked ? faHeartFilled : faHeartEmpty} size="lg" onClick={like} color={liked ? "red" : "black"} />
                    <FontAwesomeIcon icon={faComment} size="lg" onClick={showComments} />
                    <FontAwesomeIcon icon={faPaperPlane} size="lg" onClick={share} />
                </div>

                <div className="post-likes-and-date">
                    <div className="post-likes">
                        {parseInt(numOfLikes).toLocaleString()} likes
                    </div>
                    <div className="post-date">
                        {dateDiff}
                        </div>
                </div>

                <div className="post-description">
                    {description}
                </div>

                <div className="post-comments">
                    {comments &&
                        comments.length > 0 &&
                        comments.slice(0, MAX_COMMENTS).map((comment, index) => {
                            return (
                                <Comment
                                    key={index}
                                    authorId={comment.uid}
                                    authorName={comment.fullName}
                                    profilePic={comment.profilePic}
                                    content={comment.content}
                                />
                            )
                        })}
                    {comments?.length > MAX_COMMENTS &&
                        <div className="post-comments-more">
                            <a onClick={setPopupPostVisible}>Show {comments.length - MAX_COMMENTS} more comment{(comments.length - MAX_COMMENTS > 1) ? "s" : ""}</a>
                        </div>}
                    {/*<Comment authorName="Chen" authorId="3" content="nadirrrrrrrrr" />
                    <Comment authorName="Nofer" authorId="4" content="mushlammm" />*/}
                </div>
            </div>

            <div className="post-add-comment">
                <input className="post-add-comment-input" type="text" placeholder="Add a comment" onKeyDown={keyPressed}></input>
            </div>

            {popupPostVisible && <PopupPost
                recipe={recipe}
                setVisible={setPopupPostVisible} />}

        </div>

    )
}

export default Post
