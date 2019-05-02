import axios from 'axios';
import {
    GET_USER_BY_ID, GET_USER_SUCCESS, GET_USER_ERROR, RESET_SELECTED_USER,
    FOLLOW_USER, FOLLOW_USER_SUCCESS, FOLLOW_USER_ERROR,
    GET_READING_LISTS, GET_READING_LISTS_SUCCESS, GET_READING_LISTS_ERROR, RESET_READING_LISTS,
    ADD_TO_READING_LIST, ADD_TO_READING_LIST_SUCCESS, ADD_TO_READING_LIST_ERROR,
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

export const followUser = (id, follow, tokenFromStorage) => {

    return function(dispatch) {
        dispatch({type: FOLLOW_USER});

        axios({
            method: 'post',
            url: `${ROOT_URL}/follow/${id}/${follow}`,
            headers: {
                'x-access-token': tokenFromStorage
            }
        })
            .then(function(response) {
                console.log("FOLLOW")
                console.log(response)
                if (response.status === 200){
                    dispatch({type: FOLLOW_USER_SUCCESS, payload: response.data})
                } else {
                }
            })
            .catch(function(error) {
            })
    }
}

export const getReadingLists = (id) => {

    return function(dispatch) {
        dispatch({type: GET_READING_LISTS});
        axios({
            method: 'get',
            url: `${ROOT_URL}/reading-lists/${id}`,
        })
            .then(function(response) {
                console.log("get reading list", response)
                if (response.status === 200){
                    dispatch({type: GET_READING_LISTS_SUCCESS, payload: response.data.reading_lists})
                } else {
                }
            })
            .catch(function(error) {
            })
    }
};

export const addToReadingList = (id, idStory, tokenFromStorage) => dispatch => {
    dispatch({type: ADD_TO_READING_LIST , payload: id})
    axios({
        method: 'post',
        url: `${ROOT_URL}/add/readinglist/${id}/${idStory}`,
        headers: {
            'x-access-token': tokenFromStorage
        }
    })
        .then((response) => {
            console.log("add to list", response)
            if (response.status === 200){
                dispatch({type: ADD_TO_READING_LIST_SUCCESS, payload: response.data.reading_lists})
            } else {
                dispatch({type: ADD_TO_READING_LIST_ERROR, payload: response.data})
            }
        })
        .catch((error) => {
            dispatch({type: ADD_TO_READING_LIST_ERROR, payload: error})
        })
}