import React from 'react';
import { connect } from 'react-redux';
import Home from "../components/Home";
import { getLastStories, resetLastStories } from "../actions/StoryAction"

const mapDispatchToProps = (dispatch) => {
    return {
        getLastStories: () =>{
            dispatch(getLastStories());
        },
        resetMe: () => {
            dispatch(resetLastStories());
        },
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    stories: state.stories
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);