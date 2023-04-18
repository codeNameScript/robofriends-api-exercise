import React from 'react';
import './Scroll.css'

const Scroll = (props) => {
    return (
        //style={{ overflowY: 'scroll', border: '1px solid black', height: 'calc(100vh - 175px)'}}
        <div className='Scroll-js-style'>
            {props.children}
        </div>
    );
};

export default Scroll;