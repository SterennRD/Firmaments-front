import React from 'react';
import { connect } from 'react-redux';
import ReadingListDetail from '../components/reading-lists/ReadingListDetail';
import {
    getReadingList, resetSelectedReadingList
} from "../actions/UserActions";


const mapDispatchToProps = (dispatch) => {
    return {
        getReadingList: (id) => {
            dispatch(getReadingList(id))
        },
        resetMe: () => {
            dispatch(resetSelectedReadingList())
        }
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    stories: state.stories
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadingListDetail);