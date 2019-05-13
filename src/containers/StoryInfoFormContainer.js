import React from 'react';
import { connect } from 'react-redux';
import StoryInfoForm from '../components/stories/StoryInfoForm';
import {
    getStoryById
} from "../actions/StoryAction";

const mapDispatchToProps = (dispatch) => {
    return {
        getStoryById: (id) => {
            dispatch(getStoryById(id));
        },
        resetMe: () => {

        },
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    stories: state.stories,
    initialValues: state.stories.selectedStory.story,
    chapter: state.chapter
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryInfoForm);