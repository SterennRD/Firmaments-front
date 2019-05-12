import {
    SEARCH, SEARCH_ERROR, SEARCH_STORY_SUCCESS, RESET_SEARCH, ADD_TO_READING_LIST_SUCCESS
} from '../actions/types';

const initialState = {
    searchUser: null, searchStory: null, page: null, error: null, loading: false, totalResults: null, searchText: null
}

export default function(state = initialState, action ) {
    let newState = state;
    switch(action.type) {
        case SEARCH:
            return {...state, loading: true}
        case SEARCH_STORY_SUCCESS:
            return {
                ...state,
                loading:false,
                error: null,
                totalResults: action.payload.totalResults,
                searchStory: action.payload.result.stories,
                searchText: action.payload.searchText
            }
        case SEARCH_ERROR:
            return {...state,
                loading: false,
                error: action.payload,
                totalResults: null,
                searchStory: null,
                searchUser: null,
                searchText: null
            }

        case ADD_TO_READING_LIST_SUCCESS:
            if (newState.searchStory) {
                for (var i in newState.searchStory) {
                    if (newState.searchStory[i]._id == action.payload.story._id) {
                        newState.searchStory[i].nb_favorites = action.payload.story.nb_favorites;
                        break
                    }
                }
            }
            return {...newState}

        case RESET_SEARCH:
            return {...state,
                loading: false,
                error: null,
                totalResults: null,
                searchStory: null,
                searchUser: null,
                searchText: null
            }

        default:
            return state;
    }
}