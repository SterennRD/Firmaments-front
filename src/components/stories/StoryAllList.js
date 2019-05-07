import React, {Component} from 'react';
import StoryCard from "./StoryCard";

class StoryAllList extends Component {
    render() {
        const {stories, loading, error} = this.props.stories;

        if (loading) {
            return <div className="container">Loading...</div>;
        } else if(error) {
            return  <div className="alert alert-danger">{error.message}</div>
        } else if(!stories) {
            return <span />
        }

        let storyList;

        if (stories.result) {
            storyList = stories.result.map((story) => {

                return (
                    <div key={story._id} className="col-sm-3" onClick={e => this.props.handleModal(story)}>
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

        return (
            <div className="row">
                {storyList}
            </div>
        );
    }
}

export default StoryAllList;