import {
    GET_ALL_STORIES, GET_ALL_STORIES_SUCCESS, GET_ALL_STORIES_ERROR, RESET_ALL_STORIES,
    GET_STORY_FROM_USER, GET_STORY_FROM_USER_SUCCESS, GET_STORY_FROM_USER_ERROR, RESET_STORY_FROM_USER,
    GET_STORY_FROM_ID, GET_STORY_SUCCESS, GET_STORY_ERROR, RESET_SELECTED_STORY,
    GET_LAST_STORIES, GET_LAST_STORIES_SUCCESS, GET_LAST_STORIES_ERROR, RESET_LAST_STORIES,
    CREATE_STORY, CREATE_STORY_SUCCESS, CREATE_STORY_FAILURE, RESET_NEW_STORY,
    DELETE_STORY, DELETE_STORY_SUCCESS, DELETE_STORY_FAILURE, RESET_DELETED_STORY,
    EDIT_STORY, EDIT_STORY_SUCCESS, EDIT_STORY_FAILURE, RESET_EDIT_STORY,
    VALIDATE_POST_FIELDS, VALIDATE_POST_FIELDS_SUCCESS, VALIDATE_POST_FIELDS_FAILURE, RESET_POST_FIELDS,
    LOAD, EDIT_MODE, EDIT_MODE_RESET, CREATE_MODE,
} from '../actions/types';

const INITIAL_STATE = {
    stories: {stories: [], error:null, loading: false},
    postsList: {posts: [], error:null, loading: false},
    storyList: {stories: [], error:null, loading: false},
    newStory:{story:null, error: null, loading: false},
    selectedStory:{story:null, error:null, loading: false},
    deletedStory: {story: null, error:null, loading: false},
    editStory: {story: null, error:null, loading: false, success: false},
};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {

        case GET_ALL_STORIES:
            return { ...state, storyList: {...state.stories, loading: true} };
        case GET_ALL_STORIES_SUCCESS:
            return { ...state, storyList: { stories: action.payload, loading: false, error: null}}
        case GET_ALL_STORIES_ERROR:
            error = action.payload || {message: action.payload.message};
            return { ...state, storyList: {stories: null, error:error, loading:false}};
        case RESET_ALL_STORIES:
            return { ...state, storyList: {stories: null, error:null, loading: false}};

        case GET_STORY_FROM_USER:
            //console.log(action.payload)
            return { ...state, stories: {...state.stories, loading: true} };
        case GET_STORY_FROM_USER_SUCCESS:
            return { ...state, stories: { stories: action.payload, loading: false, error: null}}
        case GET_STORY_FROM_USER_ERROR:
            error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, stories: {stories: null, error:error, loading:false}};
        case RESET_STORY_FROM_USER:
            return { ...state, stories: {stories: null, error:null, loading: false}};

        case GET_STORY_FROM_ID:
            console.log("Je passe dans get story by id")
            console.log(action.payload)
            return { ...state, selectedStory:{...state.selectedStory, loading: true}};
        case GET_STORY_SUCCESS:
            console.log("get story success")
            console.log(action.payload)
            return { ...state, selectedStory: {story: action.payload, error:null, loading: false}};
        case GET_STORY_ERROR:
            console.log("get story error")
            console.log(action.payload)
            error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, selectedStory: {story: null, error:error, loading:false}};
        case RESET_SELECTED_STORY:
            return { ...state, selectedStory: {story: null, error:null, loading: false}};

        case GET_LAST_STORIES:
            return { ...state, storyList:{...state.storyList, loading: true}};
        case GET_LAST_STORIES_SUCCESS:
            return { ...state, storyList: {stories: action.payload, error:null, loading: false}};
        case GET_LAST_STORIES_ERROR:
            error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, storyList: {stories: null, error:error, loading:false}};
        case RESET_LAST_STORIES:
            return { ...state, storyList: {stories: null, error:null, loading: false}};

        case CREATE_STORY:
            console.log("Je passe dans create story reducer")
            console.log(action.payload)
            return {...state, newStory: {...state.newStory, loading: true}}
        case CREATE_STORY_SUCCESS:
            console.log("Je passe dans create story success reducer")
            console.log(action.payload)
            return {...state, newStory: {story:action.payload, error:null, loading: false}}
        case CREATE_STORY_FAILURE:
            error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
            return {...state, newStory: {story:null, error:error, loading: false}}
        case RESET_NEW_STORY:
            return {...state,  newStory:{story:null, error:null, loading: false}}

        case DELETE_STORY:
            return {...state, deletedStory: {...state.deletedStory, loading: true}}
        case DELETE_STORY_SUCCESS:
            let filterStories = state.stories.filter(item => item._id !== action.payload._id);
            return {...state, deletedStory: {story:action.payload, error:null, loading: false}, stories: filterStories}
        case DELETE_STORY_FAILURE:
            error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
            return {...state, deletedStory: {story:null, error:error, loading: false}}
        case RESET_DELETED_STORY:
            return {...state,  deletedStory:{story:null, error:null, loading: false}}

        case EDIT_STORY:
            return {...state, editStory: { ...state.editStory, loading: true}}
        case EDIT_STORY_SUCCESS:
            console.log("Je passe dans edit story success reducer")
            console.log(action.payload)
            return {...state, editStory: {story: action.payload, error: null, loading: false, success: true}}
        case EDIT_STORY_FAILURE:
            error = action.payload || {message: action.payload.message};
            return {...state, editStory: {story:null, error:error, loading: false, success: false}}
        case RESET_EDIT_STORY:
            return {...state, editStory: {story: null, error: null, loading: false, success: false}}

        case VALIDATE_POST_FIELDS:
            return {...state, newPost:{...state.newPost, error: null, loading: true}}
        case VALIDATE_POST_FIELDS_SUCCESS:
            return {...state, newPost:{...state.newPost, error: null, loading: false}}
        case VALIDATE_POST_FIELDS_FAILURE:
            let result = action.payload;
            if(!result) {
                error = {message: action.payload.message};
            } else {
                error = {title: result.title, categories: result.categories, description: result.description};
            }
            return {...state, newPost:{...state.newPost, error: error, loading: false}}
        case RESET_POST_FIELDS:
            return {...state, newPost:{...state.newPost, error: null, loading: null}}

        case LOAD:
            console.log(action.payload)
            return {...state, data: action.payload}
        case EDIT_MODE:
            return {...state, editMode: true}
        case EDIT_MODE_RESET:
            return {...state, editMode: false}
        case CREATE_MODE:
            return { ...state, selectedStory: {story: action.payload, error:null, loading: false}};

        default:
            return state;
    }
}