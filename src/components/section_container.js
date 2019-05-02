import React from 'react';
import './section_container.css'

import Home from './sections/home'
import Projects from './sections/projects'
import Contact from './sections/contact'

export default function(currentSection){
    let page;
    switch(currentSection){
        case 'Home':
            page = <Home />
            break
        case 'Projects':
            page = <Projects />
            break;
        case 'Contact':
            page = <Contact />
            break;
        default:
            page = <Home />
            break;
    }
    return(
        <div className='split left'>
            {page}
        </div>
    )
}