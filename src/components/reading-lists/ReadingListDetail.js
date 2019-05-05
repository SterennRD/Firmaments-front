import React, {Component} from 'react';
import StoryCard from "../stories/StoryCard";

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
        return (
            <div>
                <h1>{ readingList.title }</h1>
                <h2>{readingList.stories.length} histoire{readingList.stories.length > 1 ? 's' : null}</h2>
                {stories}
            </div>
        );
    }
}

export default ReadingListDetail;