import React from 'react';
import { connect } from 'react-redux';
import Parameters from '../components/user/Parameters';
import {getUserById, resetSelectedUser} from "../actions/UserActions";

const mapDispatchToProps = (dispatch) => {
    return {
        getUserById: (id) =>{
            dispatch(getUserById(id));
        },
        resetMe: () => {
            dispatch(resetSelectedUser());
        }
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Parameters);