import React from 'react';
import { connect } from 'react-redux';
import ReadingListForm from '../components/reading-lists/ReadingListForm';
import {
    getReadingList, editReadingList, resetEditReadingList
} from "../actions/UserActions";

const mapDispatchToProps = (dispatch) => {
    return {
        getReadingList: (id) => {
            dispatch(getReadingList(id))
        },
        editReadingList: (data, token) => {
            dispatch(editReadingList(data, token))
        },
        resetMe: () => {
            dispatch(resetEditReadingList())
        },
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    stories: state.stories
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadingListForm);