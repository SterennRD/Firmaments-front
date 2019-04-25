import React, { Component, PropTypes } from 'react';
import {Link} from "react-router-dom";

const StoryCard = ({
        id, title, rating, author, description, categories, nb_likes, nb_favorites, nb_comments
    }) => {
    const category = categories.map(c => <span key={c.label}>{c.label}</span>)
    return (
        <div key={id}>
            <h3><Link to={'/stories/see/' + id}>{title}</Link> <span className="badge badge-primary">{rating}</span></h3>
            <h4>Par {author}</h4>
            <p>{description}</p>
            <div>{category}</div>
            <div>{nb_likes} <i className="fas fa-heart"></i> {nb_favorites} <i className="fas fa-star"></i> {nb_comments} <i className="fas fa-comment"></i></div>
        </div>
    )
};

export default StoryCard;