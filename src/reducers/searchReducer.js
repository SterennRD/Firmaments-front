import {
    SEARCH, SEARCH_ERROR, SEARCH_SUCCESS, RESET_SEARCH
} from '../actions/types';

const initialState = {
    search: null, page: null, error: null, loading: false, totalResults: null, searchText: null
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SEARCH:
            return {...state, loading: true}
        case SEARCH_SUCCESS:
            return {
                ...state,
                loading:false,
                error: null,
                totalResults: action.payload.totalResults,
                search: action.payload.result,
                searchText: action.payload.searchText
            }
        case SEARCH_ERROR:
            return {...state, loading: false, error: action.payload, totalResults: null, search: null, searchText: null}

        default:
            return state;
    }
}