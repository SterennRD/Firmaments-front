import React from 'react';
import { connect } from 'react-redux';
import FollowButton from '../components/user/FollowButton';
import {
    followUser
} from "../actions/UserActions";

const mapDispatchToProps = (dispatch) => {
    return {
        followUser: (id, follow, token) => {
            dispatch(followUser(id, follow, token))
        }
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);