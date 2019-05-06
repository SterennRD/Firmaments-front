import React from 'react';
import { connect } from 'react-redux';
import ReadingListForm from '../components/reading-lists/ReadingListForm';
import {
    getReadingList
} from "../actions/UserActions";

const mapDispatchToProps = (dispatch) => {
    return {
        getReadingList: (id) => {
            dispatch(getReadingList(id))
        },
        resetMe: () => {

        },
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadingListForm);