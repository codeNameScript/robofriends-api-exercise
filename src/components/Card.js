import React from 'react';
import './Card.css';

const Card = ({ name, nation, vision, weapon, imgsrc, id }) => {
    return (
        <div className="bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5 widthSmaller">
            {/* <img src={`https://robohash.org/${id}?200x200`} alt='robo'></img> */}
            <img src={imgsrc}></img>
            <div>
                <h2>{name}</h2>
                <p>{nation}</p>
                <p>{vision}</p>
                <p>{weapon}</p>
            </div>
        </div>
    );
}

export default Card;