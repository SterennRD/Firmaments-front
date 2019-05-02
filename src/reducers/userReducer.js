import {
    GET_USER_BY_ID, GET_USER_SUCCESS, GET_USER_ERROR,
    ME_FROM_TOKEN, ME_FROM_TOKEN_SUCCESS, ME_FROM_TOKEN_FAILURE, RESET_TOKEN,
    FOLLOW_USER, FOLLOW_USER_ERROR, FOLLOW_USER_SUCCESS,
    GET_READING_LISTS, GET_READING_LISTS_SUCCESS, GET_READING_LISTS_ERROR, RESET_READING_LISTS,
    ADD_TO_READING_LIST, ADD_TO_READING_LIST_SUCCESS, ADD_TO_READING_LIST_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
    user: null, status:null, error:null, loading: false, isAuthenticated: false,
    selectedUser: {user: null, status:null, error:null, loading: false},
    followedUsers: { loading: false, error: null},
    userReadingLists: { loading: false, error: null, readingLists: []}
};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {

        case GET_USER_BY_ID:
            return {...state, selectedUser: { ...state.selectedUser, loading: true}}
        case GET_USER_SUCCESS:
            return {...state, selectedUser: {loading: false, user: action.payload, error: null}}
        case GET_USER_ERROR:
            return {...state, selectedUser: {loading: false, error: action.payload, user: null}}

        case ME_FROM_TOKEN:// loading currentUser("me") from jwttoken in local/session storage storage,
            return { ...state, user: null, status:'storage', error:null, loading: true};
        case ME_FROM_TOKEN_SUCCESS://return user, status = authenticated and make loading = false
            return { ...state, user: action.payload, status:'authenticated',isAuthenticated: true, error:null, loading: false}; //<-- authenticated
        case ME_FROM_TOKEN_FAILURE:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, user: null, status:'storage', error:error, loading: false};
        case RESET_TOKEN:// remove token from storage make loading = false
            return { ...state, user: null, status:'storage', error:null, loading: false};

        case FOLLOW_USER:
            return { ...state, followedUsers: {...state.followedUsers, loading: true}}
        case FOLLOW_USER_SUCCESS:
            return {...state, user: {...state.user, following: action.payload.user}, selectedUser: {...state.selectedUser, user: { ...state.selectedUser.user, followers: action.payload.followersList}}, followedUsers: {loading: false, error: null}}

        case GET_READING_LISTS:
            return {...state, userReadingLists: {...state.userReadingLists, loading: true}}
        case GET_READING_LISTS_SUCCESS:
            return {...state, userReadingLists: { readingLists: action.payload, loading: false, error: null}}

        case ADD_TO_READING_LIST:
            for (var i in state.userReadingLists.readingLists) {
                if (state.userReadingLists.readingLists[i]._id == action.payload) {
                    state.userReadingLists.readingLists[i].loading = true;
                    break
                }
            }
            return {...state, userReadingLists: { ...state.userReadingLists } }
        case ADD_TO_READING_LIST_SUCCESS:
            return {...state, userReadingLists: { ...state.userReadingLists, readingLists: action.payload }}
        case ADD_TO_READING_LIST_ERROR:
            return {...state, userReadingLists: { ...state.userReadingLists, error: action.payload }}

        default:
            return state;
    }
}