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
            dispatch(resetSelectedUser());
        },
        followUser: (id, follow, token) => {
            dispatch(followUser(id, follow, token))
        }
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);