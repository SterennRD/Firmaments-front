import {
    NOTIF_NEW_COMMENT
} from '../actions/types';

const initialState = {
    notif: null,
    notifComment: {notif: null}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case NOTIF_NEW_COMMENT:
            return {...state, notifComment: {notif: action.payload}}

        default:
            return state;
    }
}