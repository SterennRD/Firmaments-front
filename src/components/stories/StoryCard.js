import React, { Component, PropTypes } from 'react';
import {Link} from "react-router-dom";

const StoryCard = ({
        id, title, rating, author, description, categories, nb_likes, nb_favorites, nb_comments, status
    }) => {
    const category = categories.map(c => <span key={c.label}>{c.label}</span>)

    const truncateText = (text, limit) => {
        if (text.length > limit)
            for (let i = limit; i > 0; i--){
                if(text.charAt(i) === ' ' && (text.charAt(i-1) != ','||text.charAt(i-1) != '.'||text.charAt(i-1) != ';')) {
                    return text.substring(0, i) + '...';
                }
            }
        else
            return text;
    };

    return (
        <div key={id}>
            <h3><Link to={'/stories/see/' + id}>{title}</Link> <span className="badge badge-primary">{rating}</span></h3>
            <h4>Par <Link to={'/user/profile/' + author._id }>{author.username_display}</Link></h4>
            <p>{truncateText(description, 50)}</p>
            <div>{category}</div>
            <div>{status}</div>
            <div>{nb_likes} <i className="fas fa-heart"></i> {nb_favorites} <i className="fas fa-star"></i> {nb_comments} <i className="fas fa-comment"></i></div>
        </div>
    )
};

export default StoryCard;