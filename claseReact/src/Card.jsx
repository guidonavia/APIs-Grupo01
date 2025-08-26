import React from 'react';
import './card.css';

function Card({ title, description, onButtonClick, children }) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={onButtonClick}>Click me</button>
            <div>{children}</div>
        </div>
    );
}

export default Card;