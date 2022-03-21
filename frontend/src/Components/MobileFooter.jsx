import '../css/mobilefooter.css'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle, faCompass } from '@fortawesome/free-regular-svg-icons'

const MobileFooter = () => {
    return (
        <div className="footer-mobile-container">
            <div className="footer-mobile-inner-container">
                {/*<a href="/">
                    <FontAwesomeIcon icon={faHome} />
                </a>*/}

                <a href="/explore">
                    <FontAwesomeIcon icon={faCompass} />
                </a>
                <a href="/post/new">
                    <FontAwesomeIcon icon={faPlusCircle} /> {/*center*/}
                </a>
                <a href="/profile">
                    <FontAwesomeIcon icon={faUserCircle} />
                </a>
            </div>

        </div>
    )
}

export default MobileFooter