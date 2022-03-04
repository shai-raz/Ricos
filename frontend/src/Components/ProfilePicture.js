import React from 'react'
import PropTypes from 'prop-types'
import logo from '../img/logo.png'
import '../css/profilepicture.css'

const ProfilePicture = (props) => {
    const id = props.id
    const size = props.size
    const isLink = props.isLink
    const imgUrl = props.imgUrl || logo

    return (
        <div className="profile-picture-container">
            {isLink ? // render with/without link to profile
                <a href={"/profile/" + id}>
                    <img className={"profile-picture-img-" + size} src={imgUrl} alt="profile" />
                </a> :
                <img className={"profile-picture-img-" + size} src={imgUrl} alt="profile" />}
        </div>
    )
}

ProfilePicture.propTypes = {
    size: PropTypes.oneOf(['xs', 'sm', 'lg'])
}

ProfilePicture.defaultProps = {
    isLink: true
}

export default ProfilePicture