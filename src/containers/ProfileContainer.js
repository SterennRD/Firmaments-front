import React from 'react';
import { connect } from 'react-redux';
import Profile from '../components/user/Profile';
import {
getUserById, resetSelectedUser, followUser
} from "../actions/UserActions";

const mapDispatchToProps = (dispatch) => {
    return {
        getUserById: (id) =>{
            dispatch(getUserById(id));
        },
        resetMe: () => {
            console.log("je reset l'user")
            dispatch(resetSelectedUser());
        }
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    stories: state.stories
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);