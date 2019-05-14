import axios from 'axios';
import {
    GET_ALL_NOTIFS, GET_ALL_NOTIFS_SUCCESS, GET_ALL_NOTIFS_ERROR,
    GET_ALL_UNREAD_NOTIFS, GET_ALL_UNREAD_NOTIFS_SUCCESS, GET_ALL_UNREAD_NOTIFS_ERROR,
    NOTIF_NEW_COMMENT, RESET_NOTIF_NEW_COMMENT,
} from './types';

const ROOT_URL = process.env.REACT_APP_NOTIFS

export const receiveComment = (comment) => dispatch => {
    dispatch({type: NOTIF_NEW_COMMENT, payload: comment })
}
export const resetNotifComment = () => dispatch => {
    dispatch({type: RESET_NOTIF_NEW_COMMENT })
}


export const getAllNotifs = (id, token) => dispatch => {
    console.log("Je lance la recherche")
    dispatch({type: GET_ALL_NOTIFS})
    axios({
        method: 'get',
        url: `${ROOT_URL}/${id}`,
        headers: {
            'x-access-token': token
        }
    })
        .then((response) => {
            console.log("search notifs", response)
            if (response.status === 200){
                dispatch({type: GET_ALL_NOTIFS_SUCCESS, payload: response.data})
            } else {
                dispatch({type: GET_ALL_NOTIFS_ERROR, payload: response.data})
            }
        })
        .catch((error) => {
            dispatch({type: GET_ALL_NOTIFS_ERROR, payload: error})
        })

}

export const getAllUnreadNotifs = (id, token) => dispatch => {
    console.log("Je lance la recherche")
    dispatch({type: GET_ALL_UNREAD_NOTIFS})
    axios({
        method: 'get',
        url: `${ROOT_URL}/unread/${id}`,
        headers: {
            'x-access-token': token
        }
    })
        .then((response) => {
            console.log("search notifs", response)
            if (response.status === 200){
                dispatch({type: GET_ALL_UNREAD_NOTIFS_SUCCESS, payload: response.data})
            } else {
                dispatch({type: GET_ALL_UNREAD_NOTIFS_ERROR, payload: response.data})
            }
        })
        .catch((error) => {
            dispatch({type: GET_ALL_UNREAD_NOTIFS_ERROR, payload: error})
        })

}