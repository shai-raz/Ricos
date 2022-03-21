import ProfilePicture from './ProfilePicture'
import '../css/comment.css'

const Comment = (props) => {
    const authorId = props.authorId
    const authorName = props.authorName
    const content = props.content
    const withPfp = props.withPfp // show profile picture if true

    return (
        <div className="comment-container">
            {withPfp &&
                <span className="comment-pfp"><ProfilePicture id={authorId} size="xs" isLink={true} /></span>} {/* TODO: ID*/}
            <span className="comment-author">
                <a href={"/profile/" + authorId}>
                    {authorName}
                </a>
            </span>
            <span className="comment-content">{content}</span>
        </div>
    )
}

export default Comment