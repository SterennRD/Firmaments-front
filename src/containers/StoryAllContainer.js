import React from 'react';
import { connect } from 'react-redux';
import StoryAll from '../components/stories/StoryAll';
import {
    getAllStories, resetAllStories
} from "../actions/StoryAction";

const mapDispatchToProps = (dispatch) => {
    return {
        getAllStories: (page) =>{
            dispatch(getAllStories(page));
        },
        resetMe: () => {
            dispatch(resetAllStories());
        },
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    stories: state.stories,
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryAll);