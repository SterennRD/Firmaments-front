import React from 'react';
import { connect } from 'react-redux';
import Chapter from '../components/stories/Chapter';
import {
    getChapterById, resetSelectedChapter
} from "../actions/StoryAction";

const mapDispatchToProps = (dispatch) => {
    return {
        getChapterById: (id, idChapter) =>{
            dispatch(getChapterById(id, idChapter));
        },
        resetMe: () => {
            dispatch(resetSelectedChapter());
        },
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    chapter: state.chapter,
    stories: state.stories
});

export default connect(mapStateToProps, mapDispatchToProps)(Chapter);