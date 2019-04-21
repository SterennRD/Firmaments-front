import React from 'react';
import { connect } from 'react-redux';
import Profile from '../components/user/Profile';
import {

} from "../actions/StoryAction";

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);