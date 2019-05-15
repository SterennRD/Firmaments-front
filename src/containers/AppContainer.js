import React from 'react';
import { connect } from 'react-redux';
import { meFromToken,
//meFromTokenSuccess, meFromTokenFailure, resetToken
} from '../actions/users';
import {receiveComment, getAllNotifs, getAllUnreadNotifs, readChapterAdded} from "../actions/NotifAction";

import App from '../components/App.js';

const mapDispatchToProps = (dispatch) => {
    return {
        meFromToken: (token) => {
          dispatch(meFromToken(token))
        },
        receiveComment: (comment) => {
            dispatch(receiveComment(comment))
        },
        readChapterAdded: (notif) => {
            dispatch(readChapterAdded(notif))
        },
        getAllNotifs: (id, token) => {
            dispatch(getAllNotifs(id, token))
        },
        getAllUnreadNotifs: (id, token) => {
            dispatch(getAllUnreadNotifs(id, token))
        },
        /*loadUserFromToken: () => {
            let token = sessionStorage.getItem('jwtToken');
            if(!token || token === '') {//if there is no token, dont bother
                return;
            }

            //fetch user from token (if server deems it's valid token)
            dispatch(meFromToken(token))
                .then((response) => {
                    if (!response.error) {
                        //reset token (possibly new token that was regenerated by the server)
                        sessionStorage.setItem('jwtToken', response.payload.data.token);
                        dispatch(meFromTokenSuccess(response.payload))
                    } else {
                        sessionStorage.removeItem('jwtToken');//remove token from storage
                        dispatch(meFromTokenFailure(response.payload));
                    }
                });
        },
        resetMe: () =>{
            sessionStorage.removeItem('jwtToken'); //remove token from storage
            dispatch(resetToken());
        }*/
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    notifications: state.notifications,
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(App);