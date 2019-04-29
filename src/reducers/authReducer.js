import {
    ME_FROM_TOKEN,
    ME_FROM_TOKEN_FAILURE,
    ME_FROM_TOKEN_SUCCESS,
    RESET_TOKEN,
    SET_CURRENT_USER
} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_CURRENT_USER:
            console.log("je passe dans set current user")
            console.log("payload")
            console.log(action.payload)
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload.body || action.payload.user
            }
        case ME_FROM_TOKEN:// loading currentUser("me") from jwttoken in local/session storage storage,
            return { ...state, user: null, isAuthenticated: false};
        case ME_FROM_TOKEN_SUCCESS://return user, status = authenticated and make loading = false
            return { ...state, user: action.payload, isAuthenticated: true}; //<-- authenticated
        case ME_FROM_TOKEN_FAILURE:// return error and make loading = false
            let error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, user: null, error:error};
        case RESET_TOKEN:// remove token from storage make loading = false
            return { ...state, user: null, isAuthenticated: false};
        default: 
            return state;
    }
}