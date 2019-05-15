import {
    GET_CHAPTER_SUCCESS, GET_CHAPTER_ERROR,RESET_SELECTED_CHAPTER, GET_CHAPTER_BY_ID,
    EDIT_CHAPTER, EDIT_CHAPTER_SUCCESS, EDIT_CHAPTER_FAILURE, RESET_EDIT_CHAPTER,
    CREATE_CHAPTER, CREATE_CHAPTER_SUCCESS, CREATE_CHAPTER_FAILURE, RESET_NEW_CHAPTER,
    ADD_COMMENT, ADD_COMMENT_SUCCESS, ADD_COMMENT_ERROR, RESET_ADDED_COMMENT,
    DELETE_CHAPTER, DELETE_CHAPTER_SUCCESS, DELETE_CHAPTER_FAILURE, RESET_DELETED_CHAPTER,
    ADD_CHAPTER_TO_READ,ADD_CHAPTER_TO_READ_SUCCESS, ADD_CHAPTER_TO_READ_ERROR, ADD_CHAPTER_TO_READ_RESET,
} from '../actions/types';

const INITIAL_STATE = {
    chapters: [],
    story: null,
    selectedChapter: {},
    error:null,
    loading: false,
    newChapter:{chapter:null, error: null, loading: false},
    editChapter:{chapter:null, error: null, loading: false},
    newComment:{comment: null, error:null, loading: false},
    deleteChapter:{chapter: null, error:null, loading: false},
    read:{chapter: null, error:null, loading: false}
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
            console.log("reset new chapter********")
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

        case ADD_COMMENT:
            return {...state, newComment: {...state.newComment, loading: true}}
        case ADD_COMMENT_SUCCESS:
            let newState = state;
            let comment = action.payload.comments[0]
            newState.selectedChapter.comments.unshift(comment)
            return { ...newState, newComment: {loading: false, error: null, comment: comment}};
        case ADD_COMMENT_ERROR:
            error = action.payload || {message: action.payload.message};
            return { ...state, newComment: {loading: false, error: error, comment: null}};
        case RESET_ADDED_COMMENT:
            return { ...state, newComment: {loading: false, error: null, comment: null}};

        case DELETE_CHAPTER:
            return {...state, deleteChapter:{loading: true, chapter: null, error: null}}
        case DELETE_CHAPTER_SUCCESS:
            return {...state, deleteChapter:{loading: false, chapter: action.payload, error: null}}
        case DELETE_CHAPTER_FAILURE:
            return {...state, deleteChapter:{loading: false, chapter: null, error: action.payload}}
        case RESET_DELETED_CHAPTER:
            return {...state, deleteChapter:{loading: false, chapter: null, error: null}}

        case ADD_CHAPTER_TO_READ:
            return {...state, read: {...state.read, loading: true}}
        case ADD_CHAPTER_TO_READ_SUCCESS:
            console.log("ADD CHAPTER TO READ SUCCESS", action.payload)
            return {...state, read: {error: null, chapter: action.payload._id,loading: false}, selectedChapter: {...state.selectedChapter, read: action.payload.read, nbRead: action.payload.read.length}}
        case ADD_CHAPTER_TO_READ_ERROR:
            return {...state}
        case ADD_CHAPTER_TO_READ_RESET:
            return {...state}


        default:
            return state;
    }
}