import React from 'react';
import { connect } from 'react-redux';
import { searchStory } from '../actions/SearchAction';


import Search from '../components/search/Search';

const mapDispatchToProps = (dispatch) => {
    return {
        searchStory: (text, page) => {
            dispatch(searchStory(text, page));
        }
        /*
        resetMe: () =>{
            sessionStorage.removeItem('jwtToken'); //remove token from storage
            dispatch(resetToken());
        }*/
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    stories: state.stories,
    user: state.user,
    search: state.search
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);