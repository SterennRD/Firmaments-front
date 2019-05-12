import React, {Component} from 'react';
import StoryCard from "../stories/StoryCard";
import StoryModal from "../stories/StoryModal";

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            story: {}
        }
        this.handleModal = this.handleModal.bind(this)
    }


    handleModal(story) {
        console.log(story)
        this.setState({ showModal: true, story: story })
    }

    hideModal() {
        this.setState({ showModal: false, story: {} })
    }
    render() {
        const {searchStory, loading, error, totalResults, searchText} = this.props.search;

        if (loading) {
            return <div>Loading</div>
        }
        if (error) {
            return <div>{error.message}</div>
        }
        if (!searchStory || !searchText) {
            return <span/>
        }

        let resultsStories;
        if (searchStory.length > 0) {
            resultsStories = searchStory.map((story) => {

                return (
                    <div key={story._id} className="col-sm-3" onClick={e => this.handleModal(story)}>
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
                )
            })
        }

        const modal = <StoryModal
            hideModal={this.hideModal.bind(this)}
            story={this.state.story}
            auth={this.props.auth}
        />;

        return (
            <div>
                { this.state.showModal ? modal : null }
                <h2>{searchText}</h2>
                <div>{totalResults} résultat{totalResults > 1 ? 's' : null}</div>
                <div className="container">
                    <div className="row">
                        {resultsStories}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;