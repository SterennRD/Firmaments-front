import {
    GET_USER_BY_ID, GET_USER_SUCCESS, GET_USER_ERROR
} from '../actions/types';

const INITIAL_STATE = {user: null, status:null, error:null, loading: false};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {

        case GET_USER_BY_ID:
            return {...state, loading: true}
        case GET_USER_SUCCESS:
            return {...state, loading: false, user: action.payload}
        case GET_USER_ERROR:
            return {...state, loading: false, error: action.payload}

        default:
            return state;
    }
}