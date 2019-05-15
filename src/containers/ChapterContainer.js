import React from 'react';
import { connect } from 'react-redux';
import Chapter from '../components/stories/Chapter';
import {
    getChapterById, resetSelectedChapter, addChapterToRead
} from "../actions/StoryAction";

const mapDispatchToProps = (dispatch) => {
    return {
        getChapterById: (id, idChapter) =>{
            dispatch(getChapterById(id, idChapter));
        },
        resetMe: () => {
            dispatch(resetSelectedChapter());
        },
        addChapterToRead: (id, idChapter, token, socket) => {
            dispatch(addChapterToRead(id, idChapter, token, socket))
        }
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    chapter: state.chapter,
    stories: state.stories
});

export default connect(mapStateToProps, mapDispatchToProps)(Chapter);