import React from 'react';
import { connect } from 'react-redux';
import StoryForm from '../components/stories/StoryFormWizard';
import {
    getStory, deleteStory, getStoryById, resetSelectedStory,
    createStory, createStoryFailure, createStorySuccess, resetNewStory,
    editStory, resetEditStory,
    editMode, resetEditMode
} from "../actions/StoryAction";
import {initialize} from 'redux-form'

const mapDispatchToProps = (dispatch) => {
    return {
        getStory: (user) =>{
            dispatch(getStory(user));
        },
        deleteStory: (id) =>{
            dispatch(deleteStory(id));
        },
        getStoryById: (id) => {
            dispatch(getStoryById(id))
        },
        createStory: (story, token) => {
            dispatch(createStory(story, token))
        },
        createStoryFailure: (error) => {
            dispatch(createStoryFailure(error))
        },
        createStorySuccess: (newStory) => {
            dispatch(createStorySuccess(newStory))
        },
        resetMe: () => {
            dispatch(resetNewStory());
            dispatch(resetSelectedStory());
            dispatch(resetEditMode());
            dispatch(resetEditStory());
        },
        editMode: () => {
            dispatch(editMode());
        },
        editStory: (props, token) => {
            console.log("je passe dans le dispatch edit sotry")
            dispatch(editStory(props, token))
        }
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    stories: state.stories,
    //newStory: state.stories.newStory,
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm);