import React from 'react';
import { connect } from 'react-redux';
import StoryTable from '../components/stories/StoryTable';
import {
    editChapter, getStoryById, resetSelectedChapter
} from "../actions/StoryAction";

const mapDispatchToProps = (dispatch) => {
    return {
        getStoryById: (id) => {
            dispatch(getStoryById(id))
        },
        editChapter: (props, id, token) => {
            dispatch(editChapter(props, id, token))
        },
        resetMe: () => {
            console.log("je démonte story table")
            dispatch(resetSelectedChapter());
        },
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    stories: state.stories,
    chapter: state.chapter
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryTable);