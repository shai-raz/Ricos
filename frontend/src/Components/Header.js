import { BrowserView, MobileView } from 'react-device-detect'
import ricos from "../img/ricos.png"
import SearchBar from './SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { faCompass } from '@fortawesome/free-regular-svg-icons'

import '../css/header.css'
import { faBars, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-inner-container">
                <a href="/">
                    <div className="header-logo">
                        <img id="header-logo-img" src={ricos} alt="Logo!" />
                    </div>
                </a>
                <div>
                    <SearchBar />
                </div>
                <div className="header-icons-container">

                    <BrowserView>
                        <a href="/post/new">
                            <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                        </a>
                    </BrowserView>

                    <BrowserView>
                        <a href="/explore">
                            <FontAwesomeIcon icon={faCompass} size="lg" />
                        </a>
                    </BrowserView>


                    <a href="/">
                        <FontAwesomeIcon icon={faEnvelope} size="lg" />
                    </a>

                    <BrowserView>
                        <a href="/profile">
                            <FontAwesomeIcon icon={faUserCircle} size="lg" />
                        </a>
                    </BrowserView>

                    <a href="/logout">
                        <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                    </a>

                </div>

                {/*<div className="header-burger-icon">
                    <FontAwesomeIcon icon={faBars} size="2x" />
                </div>*/}
            </div>
        </div>
    )
}
export default Header