import axios from 'axios';
import {
    GET_ALL_STORIES, NOTIF_NEW_COMMENT
} from './types';

const ROOT_URL = process.env.REACT_APP_NOTIFS

export const receiveComment = (comment) => dispatch => {
    dispatch({type: NOTIF_NEW_COMMENT, payload: comment })
}

export function resetAllStories() {
    return {

    }
}