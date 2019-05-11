import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import storyReducer from './storyReducer';
import chapterReducer from './chapterReducer';
import notifsReducer from "./notifsReducer";
import searchReducer from "./searchReducer";
import { reducer as formReducer } from 'redux-form';
import { CREATE_STORY_SUCCESS, RESET_FORM } from '../actions/types'

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    form: formReducer.plugin({
        StoryForm: (state, action) => { // <------ 'account' is name of form given to reduxForm()
            switch(action.type) {
                case RESET_FORM:
                    console.log("je passe dans le reset form")
                    return undefined;
                case CREATE_STORY_SUCCESS:
                    return undefined;       // <--- blow away form data
                default:
                    return state;
            }
        }
    }),
    user: userReducer,
    stories: storyReducer,
    chapter: chapterReducer,
    notifications: notifsReducer,
    search: searchReducer
});