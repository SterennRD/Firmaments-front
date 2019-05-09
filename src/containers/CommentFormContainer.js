import React from 'react';
import { connect } from 'react-redux';
import CommentForm from '../components/stories/CommentForm';
import {
    resetAddedComment
} from "../actions/StoryAction";

const mapDispatchToProps = (dispatch) => {
    return {
        resetMe: () => {
            dispatch(resetAddedComment())
        },
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    chapter: state.chapter
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);