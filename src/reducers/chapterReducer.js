import {
    GET_CHAPTER_SUCCESS,
    GET_CHAPTER_ERROR,
    RESET_SELECTED_CHAPTER,
    GET_CHAPTER_BY_ID,
    EDIT_CHAPTER,
    EDIT_CHAPTER_SUCCESS,
    EDIT_CHAPTER_FAILURE,
    RESET_EDIT_CHAPTER,
    CREATE_CHAPTER,
    CREATE_CHAPTER_SUCCESS,
    CREATE_CHAPTER_FAILURE, RESET_NEW_CHAPTER,
} from '../actions/types';

const INITIAL_STATE = {
    chapters: [],
    story: null,
    selectedChapter: {},
    error:null,
    loading: false,
    newChapter:{chapter:null, error: null, loading: false},
    editChapter:{chapter:null, error: null, loading: false},
};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {

        case GET_CHAPTER_BY_ID:
            return { ...state, loading: true};
        case GET_CHAPTER_SUCCESS:
            return { ...state, story: action.payload.story, selectedChapter: {...action.payload.selectedChapter, titleChapter: action.payload.selectedChapter.title}, error:null, loading: false};
        case GET_CHAPTER_ERROR:
            error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, story: null, selectedChapter: null, error:error, loading:false};
        case RESET_SELECTED_CHAPTER:
            return { ...state, story: null, selectedChapter: null, error:null, loading: false};

        case CREATE_CHAPTER:
            console.log("Je passe dans create chapter reducer")
            console.log(action.payload)
            return {...state, newChapter: {...state.newChapter, loading: true}}
        case CREATE_CHAPTER_SUCCESS:
            console.log("Je passe dans create chapter success reducer")
            console.log(action.payload)
            return {...state, newChapter: {chapter:action.payload, error:null, loading: false}}
        case CREATE_CHAPTER_FAILURE:
            error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
            return {...state, newChapter: {chapter:null, error:error, loading: false}}
        case RESET_NEW_CHAPTER:
            return {...state,  newChapter:{chapter:null, error:null, loading: false}}

        case EDIT_CHAPTER:
            console.log("Je passe dans edit chapter reducer")
            console.log(action.payload)
            return {...state, editChapter: {...state.editChapter, loading: true}}
        case EDIT_CHAPTER_SUCCESS:
            console.log("Je passe dans edit story success reducer")
            console.log(action.payload)
            return { ...state, editChapter: {loading: false, error: null, chapter: action.payload},selectedChapter: {...action.payload, titleChapter: action.payload.title}};
        case EDIT_CHAPTER_FAILURE:
            error = action.payload || {message: action.payload.message};
            return { ...state, editChapter: {loading: false, error: error, chapter: null}};
        case RESET_EDIT_CHAPTER:
            return { ...state, story: null, editChapter: {loading: false, error: null, chapter: null}};

        default:
            return state;
    }
}