import React from 'react';
import { connect } from 'react-redux';
import {  } from '../actions/users';


import Search from '../components/search/Search';

const mapDispatchToProps = (dispatch) => {
    return {
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
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);