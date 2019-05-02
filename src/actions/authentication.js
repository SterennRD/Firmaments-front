import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import {meFromToken, meFromTokenFailure, meFromTokenSuccess, resetToken} from "./users";
export const registerUser = (user, history) => dispatch => {
    axios.post('http://localhost:3000/users/signup', user)
        .then(res => history.push('/login'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const loginUser = (user) => dispatch => {
    axios.post('http://localhost:3000/users/login', user)
        .then(res => {
            console.log("res")
            console.log(res)
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            console.log("decoded")
            console.log(decoded)

            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            console.log("err login", err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}
