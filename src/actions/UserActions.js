import axios from 'axios';
import { reduxForm, SubmissionError } from 'redux-form'
import {
    GET_ERRORS,
    GET_USER_BY_ID, GET_USER_SUCCESS, GET_USER_ERROR, RESET_SELECTED_USER,
    FOLLOW_USER, FOLLOW_USER_SUCCESS, FOLLOW_USER_ERROR,
    GET_READING_LISTS, GET_READING_LISTS_SUCCESS, GET_READING_LISTS_ERROR, RESET_READING_LISTS,
    GET_READING_LIST, GET_READING_LIST_SUCCESS, GET_READING_LIST_ERROR, RESET_READING_LIST,
    ADD_TO_READING_LIST, ADD_TO_READING_LIST_SUCCESS, ADD_TO_READING_LIST_ERROR,
    CREATE_READING_LIST, CREATE_READING_LIST_SUCCESS, CREATE_READING_LIST_ERROR, RESET_NEW_READING_LIST,
    EDIT_READING_LIST, EDIT_READING_LIST_SUCCESS, EDIT_READING_LIST_ERROR, RESET_EDIT_READING_LIST,
    DELETE_READING_LIST, DELETE_READING_LIST_SUCCESS, DELETE_READING_LIST_ERROR, RESET_DELETE_READING_LIST,
    EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_ERROR, RESET_EDITED_USER,
} from './types';

const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/users' : '/users';

export const getUserById = (id) => {

    return function(dispatch) {
        dispatch({type: GET_USER_BY_ID});

        axios.get(`${ROOT_URL}/${id}`)
            .then(function(response) {
                console.log("get user", response)
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
                dispatch({type: ADD_TO_READING_LIST_SUCCESS, payload: response.data})
            } else {
                dispatch({type: ADD_TO_READING_LIST_ERROR, payload: response.data})
            }
        })
        .catch((error) => {
            dispatch({type: ADD_TO_READING_LIST_ERROR, payload: error})
        })
}

export const createReadingList = (data, id, idStory, tokenFromStorage) => dispatch => {
    dispatch({type: CREATE_READING_LIST})
    axios({
        method: 'post',
        data: {title:data},
        url: `${ROOT_URL}/new/readinglist/${id}/${idStory}`,
        headers: {
            'x-access-token': tokenFromStorage
        }
    })
        .then((response) => {
            console.log("create list", response)
            if (response.status === 200){
                dispatch({type: CREATE_READING_LIST_SUCCESS, payload: response.data})
            } else {
                dispatch({type: CREATE_READING_LIST_ERROR, payload: response.data})
            }
        })
        .catch((error) => {
            dispatch({type: CREATE_READING_LIST_ERROR, payload: error})
        })
}

export const getReadingList = (id) => {

    return function(dispatch) {
        dispatch({type: GET_READING_LIST});
        axios({
            method: 'get',
            url: `${ROOT_URL}/reading-lists/details/${id}`,
        })
            .then(function(response) {
                console.log("get reading list", response)
                if (response.status === 200){
                    dispatch({type: GET_READING_LIST_SUCCESS, payload: response.data})
                } else {
                }
            })
            .catch(function(error) {
            })
    }
};

export function resetSelectedReadingList() {
    return {
        type: RESET_READING_LIST
    }
};


export const editReadingList = (data, token) => {

    return function(dispatch) {
        dispatch({type: EDIT_READING_LIST});
        axios({
            method: 'post',
            data: data,
            url: `${ROOT_URL}/reading-lists/details/${data._id}/edit`,
            headers: {
                'x-access-token': token
            }
        })
            .then(function(response) {
                console.log("edit reading list", response)
                if (response.status === 200){
                    dispatch({type: EDIT_READING_LIST_SUCCESS, payload: response.data})
                } else {
                    dispatch({type: EDIT_READING_LIST_ERROR, payload: response.data})
                }
            })
            .catch(function(error) {
                dispatch({type: EDIT_READING_LIST_ERROR, payload: error})
            })
    }
};
export function resetEditReadingList() {
    return {
        type: RESET_EDIT_READING_LIST
    }
};

export const deleteReadingList = (id, token) => {

    return function(dispatch) {
        dispatch({type: DELETE_READING_LIST});
        axios({
            method: 'post',
            url: `${ROOT_URL}/reading-lists/details/${id}/delete`,
            headers: {
                'x-access-token': token
            }
        })
            .then(function(response) {
                console.log("delete reading list", response)
                if (response.status === 200){
                    dispatch({type: DELETE_READING_LIST_SUCCESS, payload: response.data})
                } else {
                    dispatch({type: DELETE_READING_LIST_ERROR, payload: response.data})
                }
            })
            .catch(function(error) {
                dispatch({type: DELETE_READING_LIST_ERROR, payload: error})
            })
    }
};


export const editUser = (props, token) => {

    return function(dispatch) {
        dispatch({type: EDIT_USER});
        return axios({
            method: 'post',
            data: props,
            url: `${ROOT_URL}/edit`,
            headers: {
                'x-access-token': token
            }
        })
            .then(function(response) {
                console.log("edit user response", response)
                if (response.status === 200){
                    //dispatch({type: EDIT_USER_SUCCESS, payload: response.data})
                } else {
                    //dispatch({type: EDIT_USER_ERROR, payload: response.data})
                }
            })
            .catch(function(error) {
                console.log(error.response)
                dispatch({type: EDIT_USER_ERROR, payload: error.response.data})

                throw new SubmissionError(error.response.data)
            })
    }
};