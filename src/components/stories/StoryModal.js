import React, {Component} from 'react';
import '../style/story-modal.scss';
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
        const cover = story.cover ? <img src={ROOT_URL + story.cover} className="w-25"/> : <div><i className="fas fa-book"></i> </div>;
        return (
            <div className="storyModal">
                <div className="storyModal__overlay" onClick={this.props.hideModal}></div>
                <div className="storyModal__window">
                    <div className="storyModal__cover">{cover}</div>
                    <div className="storyModal__info">
                        <div className="storyModal__stats">{story.nb_likes} <i className="fas fa-heart"></i> {story.nb_favorites} <i className="fas fa-star"></i> {story.nb_comments} <i className="fas fa-comment"></i></div>
                        <h2>{story.title} <span className="badge badge-primary">{story.rating.label}</span></h2>
                        <div>Par {story.author.username_display}</div>
                        <div>{category}</div>
                        <p>{story.description}</p>
                        <div>
                            <button>Lire</button>
                            <div className="btn btn-primary">
                                <div onClick={this.handleTooltip}>Ajouter à une liste de lecture</div>
                                {isAuthenticated && this.state.showTooltip ? <ReadingListsTooltip id={story._id} /> : null}
                            </div>
                        </div>
                    </div>
                    <div className="storyModal__info_status">{story.status.label}</div>
                </div>
            </div>
        );
    }
}

export default StoryModal;