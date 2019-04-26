import React from 'react';
import { connect } from 'react-redux';
import Like from '../components/stories/Like';
import {
    likeStory
} from "../actions/StoryAction";

const mapDispatchToProps = (dispatch) => {
    return {
        likeStory: (id, idUser, token) => {
            dispatch(likeStory(id, idUser, token))
        }
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    stories: state.stories,
    likes: state.stories.likeList
    //newStory: state.stories.newStory,
});

export default connect(mapStateToProps, mapDispatchToProps)(Like);