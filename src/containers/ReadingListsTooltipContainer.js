import React from 'react';
import { connect } from 'react-redux';
import ReadingListsTooltip from '../components/user/ReadingListsTooltip';
import {
    getReadingLists,
    addToReadingList
} from "../actions/UserActions";
import {

} from "../actions/StoryAction";


const mapDispatchToProps = (dispatch) => {
    return {
        getReadingLists: (id) => {
            dispatch(getReadingLists(id))
        },
        addToReadingList: (id, idStory, token) => {
            dispatch(addToReadingList(id, idStory, token))
        }
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadingListsTooltip);