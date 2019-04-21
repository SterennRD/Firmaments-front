import {combineReducers} from "redux";
import {RECEIVE_TAGS, CREATE_TAG, REGISTER_USER} from "./actions";

const defaultState = { user: {}, users: [] };

const tagReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_TAGS:
            return action.payload;
        case CREATE_TAG:
            return [...state, action.payload];
        default:
            return state;
    }
};

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return [...state, action.payload];
        default:
            return state;
    }
};

const reducers = combineReducers({
    tags: tagReducer,
    user: userReducer
});

export default reducers;