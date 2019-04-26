import React from 'react';
import { connect } from 'react-redux';
import Story from '../components/stories/Story';
import {
    getStory, deleteStory, getStoryById, resetSelectedStory, resetDeletedStory,
    createStory, createStoryFailure, createStorySuccess, resetNewStory,
    editStory, resetEditStory,
    editMode, resetEditMode, createMode,
    resetStoryFromUser, likeStory
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
            dispatch(resetDeletedStory());
            dispatch(resetStoryFromUser());
        },
        editMode: () => {
            dispatch(editMode());
        },
        createMode: () => {
            dispatch(createMode());
        },
        editStory: (props, token) => {
            console.log("je passe dans le dispatch edit sotry")
            dispatch(editStory(props, token))
        },
        likeStory: (id, idUser, token) => {
            dispatch(likeStory(id, idUser, token))
        }
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    stories: state.stories,
    //initialValues: state.stories.selectedStory.story
    //newStory: state.stories.newStory,
});

export default connect(mapStateToProps, mapDispatchToProps)(Story);