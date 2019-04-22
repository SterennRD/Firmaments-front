import axios from 'axios';
import {
    GET_USER_BY_ID, GET_USER_SUCCESS, GET_USER_ERROR, RESET_SELECTED_USER
} from './types';

const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/users' : '/users';

export const getUserById = (id) => {

    return function(dispatch) {
        dispatch({type: GET_USER_BY_ID});

        axios.get(`${ROOT_URL}/${id}`)
            .then(function(response) {
                if (response.status === 200){
                    dispatch({type: GET_USER_SUCCESS, payload: response.data})
                } else {
                    dispatch({type: GET_USER_ERROR, payload: response.data})
                }
            })
            .catch(function(error) {
                dispatch({type: GET_USER_ERROR, payload: error.data})
            })
    }
};

export function resetSelectedUser() {
    return {
        type: RESET_SELECTED_USER
    }
};