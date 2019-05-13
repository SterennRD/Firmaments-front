import React, { Component, PropTypes } from 'react';
import {Link} from "react-router-dom";

const StoryCard = ({
        id, title, rating, author, description, categories, nb_likes, nb_favorites, nb_comments, status, cover
    }) => {
    const category = categories.map(c => <span key={c.label} className="storyCard__category_item">{c.label}</span>)

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
        <div key={id} className="storyCard d-flex">
            <div className="storyCard__left mr-3">
                <div className="storyCard__cover d-flex align-items-center justify-content-center">
                    { cover ? <img src={process.env.REACT_APP_UPLOADS + '/' + cover} /> : <i className="fas fa-book"></i>}
                </div>
                <div className="storyCard__stats d-flex">
                    <div className="mr-2">{nb_likes} <i className="fas fa-heart"></i></div>
                    <div className="mr-2">{nb_favorites} <i className="fas fa-star"></i></div>
                    <div>{nb_comments} <i className="fas fa-comment"></i></div>
                </div>
                <div className="storyCard__status">{status}</div>
            </div>
            <div className="flex-fill d-flex flex-column">
                <h3 className="storyCard__title mb-0">
                    <Link className="storyCard__title_link mr-2" to={'/stories/see/' + id}>{title}</Link>
                <span className="storyCard__badge badge badge-primary">{rating}</span></h3>
                <h4 className="storyCard__author">Par <Link to={'/user/profile/' + author._id }>{author.username_display}</Link></h4>
                <p className="storyCard__description">{truncateText(description, 100)}</p>
                <div className="storyCard__category mt-auto">{category}</div>
            </div>
        </div>
    )
};

export default StoryCard;