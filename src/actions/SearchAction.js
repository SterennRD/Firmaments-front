import axios from 'axios';
import {
    SEARCH, SEARCH_STORY_SUCCESS, SEARCH_USER_SUCCESS, SEARCH_ERROR, RESET_SEARCH
} from './types';

const jwt = require('jsonwebtoken');



const ROOT_URL = process.env.REACT_APP_STORIES;

export const searchStory = (text, page) => dispatch => {
    console.log("Je lance la recherche")
    dispatch({type: SEARCH})
    if (page == undefined || !page) {
        page = 1
    }
    axios.get(`${ROOT_URL}/search/story/all/${page}/5?search=${text}`)
        .then((response) => {
            if (response.status === 200){
                console.log("search results", response)
                dispatch({type: SEARCH_STORY_SUCCESS, payload: response.data})
            } else {
                dispatch({type: SEARCH_ERROR, payload: response.data})
            }
        })
        .catch((error) => {
            dispatch({type: SEARCH_ERROR, payload: error})
        })

}
export const resetSearch = () => {
    return {
        type: RESET_SEARCH
    }
}