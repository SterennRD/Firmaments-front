import React from 'react';
import { connect } from 'react-redux';
import {
    getChapterById, resetSelectedChapter
} from "../actions/StoryAction";
import {changePassword,resetChangePassword} from "../actions/UserActions";

import ParametersPassword from "../components/user/ParametersPassword";

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (props, token) => {
            dispatch(changePassword(props, token))
        },
        resetMe: () => {
            dispatch(resetChangePassword())
        },
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(ParametersPassword);