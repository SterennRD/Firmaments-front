import React from 'react';
import { connect } from 'react-redux';
import ReadingListsTooltip from '../components/user/ReadingListsTooltip';
import {
    getReadingLists,
    addToReadingList,
    createReadingList
} from "../actions/UserActions";


const mapDispatchToProps = (dispatch) => {
    return {
        getReadingLists: (id) => {
            dispatch(getReadingLists(id))
        },
        addToReadingList: (id, idStory, token) => {
            dispatch(addToReadingList(id, idStory, token))
        },
        createReadingList: (data, id, idStory, token) => {
            dispatch(createReadingList(data, id, idStory, token))
        }
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    stories: state.stories
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadingListsTooltip);