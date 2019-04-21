import {
    GET_USER_BY_ID
} from '../actions/types';

const INITIAL_STATE = {user: null, status:null, error:null, loading: false};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {

        case GET_USER_BY_ID:
            return {...state, loading: true}

        default:
            return state;
    }
}