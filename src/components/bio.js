import React from 'react';
import GithubIcon from '../images/svg/github.svg'
import LinkedinIcon from '../images/svg/linkedin.svg'
import CodepenIcon from '../images/svg/codepen.svg'
import ProfileImage from '../images/profile_img_square.jpg'

import './bio.css'

const noBreak = {
    whiteSpace: 'nowrap'
}
export default function Bio(){

    return (
        <div className='split right'>
            {/* <div className="nav">
                <div>
                    <a className="nav-item" href="#">About</a>
                    <a className="nav-item" href="#">Projects</a>
                    <a className="nav-item" href="#">Contact</a>
                </div>
            </div> */}
            <div className="centered">
                <img src={ProfileImage} alt="me" />
                <h2>Marouane <span style={noBreak}>Er-rouhi</span></h2>
                <a className="social-icon" href="https://github.com/marouane-erouhi" target="noopener">
                    <img alt="" src={GithubIcon} width="32" />
                </a>
                <a className="social-icon" href="https://www.linkedin.com/in/marouane-e/" target="noopener">
                    <img alt="" src={LinkedinIcon} width="32" />
                </a>

                <a className="social-icon" href="https://codepen.io/marouane-e/#" target="noopener">
                    <img alt="" src={CodepenIcon} width="32" />
                </a>
            </div>
        </div>
    )
}