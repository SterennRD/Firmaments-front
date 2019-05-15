import React, {Component} from 'react';
import {Link} from "react-router-dom";

import StoryCard from "../stories/StoryCard";
import StoryModal from "../stories/StoryModal";

class ReadingListDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            story: {}
        }
        this.handleModal = this.handleModal.bind(this)
    }
    fetchData(id) {
        this.props.getReadingList(id)
    }
    componentWillUnmount() {
        this.props.resetMe();
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        this.fetchData(id)
    }
    handleModal(story) {
        console.log(story)
        this.setState({ showModal: true, story: story })
    }
    hideModal() {
        this.setState({ showModal: false, story: {} })
    }
    render() {
        console.log("rl", this.props)
        const { readingList, loading, error } = this.props.user.selectedReadingList;
        let isMyRl = false;

        if (this.props.auth.isAuthenticated && readingList) {
            console.log("je vérifie", this.props.auth.user._id, readingList.owner)
            if ( this.props.auth.user._id === readingList.owner ) {
                console.log("c'est à moi")
                isMyRl = true;
            }
        }

        let stories;
        if (readingList) {
            stories = readingList.stories.map(story => (
                <div key={story._id} className="col-sm-4" onClick={e => this.handleModal(story)}>
                    <StoryCard
                        id={story._id}
                        title={story.title}
                        author={story.author}
                        description={story.description}
                        rating={story.rating.label}
                        categories={story.category}
                        nb_likes={story.nb_likes}
                        nb_favorites={story.nb_favorites}
                        nb_comments={story.nb_comments}
                        status={story.status.label}
                    />
                </div>
            ));
        }

        if (loading) {
            return <div className="container">Loading...</div>;
        } else if(error) {
            return  <div className="alert alert-danger">{error.message}</div>
        } else if(!readingList) {
            return <span />
        }

        const modal = <StoryModal
            hideModal={this.hideModal.bind(this)}
            story={this.state.story}
            auth={this.props.auth}
        />;
        return (
            <div className="readingList">
                <div className="readingList__header">
                    { isMyRl ? <Link to={this.props.match.url + "/edit"}>éditer</Link> : null }
                    { this.state.showModal ? modal : null }
                    <h1>{ readingList.title }</h1>
                    <h2>{readingList.stories.length} histoire{readingList.stories.length > 1 ? 's' : null}</h2>
                    {readingList.description ? <p>{readingList.description}</p> : null}
                </div>
                <div className="container">
                    <div className="row">
                        {stories}
                    </div>
                </div>
            </div>
        );
    }
}

export default ReadingListDetail;