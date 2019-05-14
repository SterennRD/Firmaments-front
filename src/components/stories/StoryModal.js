import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ReadingListsTooltip from "../../containers/ReadingListsTooltipContainer";
const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/images/uploads/' : '/images/uploads/';

class StoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTooltip: false,
        }
        this.handleTooltip = this.handleTooltip.bind(this)
        //this.hideTooltip = this.hideTooltip.bind(this)
    }

    handleTooltip() {
        if (this.state.showTooltip) {
            this.setState({ showTooltip: false })
        } else {
            this.setState({ showTooltip: true })
        }
    }
    hideTooltip() {
        this.setState({ showTooltip: false })
        console.log("je cache")
    }
    render() {
        const { isAuthenticated } = this.props.auth;
        const {story} = this.props;
        const category = story.category.map(c => <span key={c.label}>{c.label}</span>)

        return (
            <div className="storyModal">
                <div className="storyModal__overlay" onClick={this.props.hideModal}></div>
                <div className="storyModal__window">
                    <div className="storyModal__left mr-3">
                        <div className="storyModal__cover">
                            {story.cover ?
                                <img src={ROOT_URL + story.cover} alt={story.title} />
                                :
                                <i className="fas fa-book"></i>
                            }
                        </div>
                        <div>{story.status.label}</div>
                    </div>
                    <div className="storyModal__info">
                        <div className="storyModal__stats d-flex">
                            <span className="mr-2">{story.nb_likes} <i className="fas fa-heart"></i></span>
                            <span className="mr-2">{story.nb_favorites} <i className="fas fa-star"></i></span>
                            <span>{story.nb_comments} <i className="fas fa-comment"></i></span>
                        </div>
                        <h2 className="storyModal__title mb-0">
                            <Link to={"/stories/see/" + story._id} className="storyModal__title_link mr-3">{story.title}</Link>
                            <span className="storyModal__title_badge badge badge-primary">{story.rating.label}</span>
                        </h2>
                        <div className="storyModal__author">Par <Link to={"/user/profile/" + story.author._id}>{story.author.username_display}</Link></div>
                        <div>{category}</div>
                        <p className="storyModal__description">{story.description}</p>
                        <div className="storyModal__buttons">
                            <Link to={"/stories/see/" + story._id} className="storyModal__buttons_btn">Lire</Link>
                            <div className="storyModal__rl">
                                <div className="storyModal__buttons_btn" onClick={this.handleTooltip}>Ajouter à une liste de lecture</div>
                                {isAuthenticated && this.state.showTooltip ? <ReadingListsTooltip id={story._id} /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StoryModal;