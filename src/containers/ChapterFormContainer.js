import React from 'react';
import { connect } from 'react-redux';
import ChapterForm from '../components/stories/ChapterForm';
import {
    getChapterById, resetSelectedChapter,
    editChapter, getStoryById, createChapter, resetNewChapter, resetEditChapter
} from "../actions/StoryAction";

const mapDispatchToProps = (dispatch) => {
    return {
        getStoryById: (id) => {
            dispatch(getStoryById(id));
        },
        getChapterById: (id, idChapter) =>{
            dispatch(getChapterById(id, idChapter));
        },
        createChapter: (props, id, token) => {
          dispatch(createChapter(props, id, token))  ;
        },
        editChapter: (props, id, token) => {
            dispatch(editChapter(props, id, token))
        },
        resetMe: () => {
            dispatch(resetSelectedChapter());
            dispatch(resetNewChapter());
            dispatch(resetEditChapter());
        },
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    stories: state.stories,
    chapter: state.chapter,
    initialValues: state.chapter.selectedChapter
});

export default connect(mapStateToProps, mapDispatchToProps)(ChapterForm);