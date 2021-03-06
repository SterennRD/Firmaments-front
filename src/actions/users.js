import axios from 'axios';
import io from 'socket.io-client';
import {
    ME_FROM_TOKEN,
    ME_FROM_TOKEN_FAILURE,
    ME_FROM_TOKEN_SUCCESS,
    RESET_TOKEN
} from "./types";


const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/users' : '/users';


export const meFromToken = (tokenFromStorage) => (dispatch) => {
    //check if the token is still valid, if so, get me from the server
    dispatch({type: ME_FROM_TOKEN});
    axios({
        method: 'get',
        url: `${ROOT_URL}/me/from/token?token=${tokenFromStorage}`,
        headers: {
            'Authorization': `Bearer ${tokenFromStorage}`
        }
    })
        .then(res => {
            console.log("me from token", res)
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);

            var socket = io.connect('http://localhost:4001');
            socket.emit('currentUser', res.data.user);
            dispatch({type: ME_FROM_TOKEN_SUCCESS, payload: {user: res.data.user, socket: socket}})
        })
        .catch(err => {
            console.log(err)
            dispatch({type: ME_FROM_TOKEN_FAILURE, payload: err})
        });
}

export function resetToken() {//used for logout
    return {
        type: RESET_TOKEN
    };
}
