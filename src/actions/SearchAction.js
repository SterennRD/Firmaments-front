import axios from 'axios';
import {

} from './types';

const jwt = require('jsonwebtoken');



const ROOT_URL = process.env.REACT_APP_STORIES;

export const addComment = (search) => dispatch => {

    dispatch({type: ADD_COMMENT})
    axios({
        method: 'get',
        url: `${ROOT_URL}/stories/${id}/add-comment`,
    })
        .then((response) => {
            if (response.status === 200){
                console.log("search results", response)
                //dispatch({type: ADD_COMMENT_SUCCESS, payload: response.data})
            } else {
                //dispatch({type: ADD_COMMENT_ERROR, payload: response.data})
            }
        })
        .catch((error) => {
            //dispatch({type: ADD_COMMENT_ERROR, payload: error})
        })

}
export const resetAddedComment = () => {
    return {
        type: RESET_ADDED_COMMENT
    }
}