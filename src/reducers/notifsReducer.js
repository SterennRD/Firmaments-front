import {
    GET_ALL_NOTIFS, GET_ALL_NOTIFS_SUCCESS, GET_ALL_NOTIFS_ERROR,
    GET_ALL_UNREAD_NOTIFS, GET_ALL_UNREAD_NOTIFS_SUCCESS, GET_ALL_UNREAD_NOTIFS_ERROR,
    NOTIF_NEW_COMMENT, RESET_NOTIF_NEW_COMMENT,
    NOTIF_READ, RESET_NOTIF_READ,
} from '../actions/types';

const initialState = {
    notif: null,
    allNotifs: {loading: false, error: null, notifs: null},
    allUnreadNotifs: {loading: false, error: null, notifs: null},
    notifComment: {notif: []},
    notifRead: {notif: []}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case NOTIF_NEW_COMMENT:
            let notifCom = [...new Set([...state.notifComment.notif, action.payload])]
            return {...state, notifComment: {notif: notifCom}}
        case RESET_NOTIF_NEW_COMMENT:
            return {...state, notifComment: { notif: null}}

        case NOTIF_READ:
            let notifRead = [...new Set([...state.notifRead.notif, action.payload])]
            return {...state, notifRead: {notif: notifRead}}
        case RESET_NOTIF_READ:
            return {...state, notifRead: { notif: null}}

        case GET_ALL_NOTIFS:
            return {...state, allNotifs: {...state.allNotifs, loading: true}}
        case GET_ALL_NOTIFS_SUCCESS:
            return {...state, allNotifs: {loading: false, error: null, notifs: action.payload}}
        case GET_ALL_NOTIFS_ERROR:
            return {...state, allNotifs: {loading: false, error: action.payload, notifs: null}}

        case GET_ALL_UNREAD_NOTIFS:
            return {...state, allUnreadNotifs: {...state.allUnreadNotifs, loading: true}}
        case GET_ALL_UNREAD_NOTIFS_SUCCESS:
            return {...state, allUnreadNotifs: {loading: false, error: null, notifs: action.payload}}
        case GET_ALL_UNREAD_NOTIFS_ERROR:
            return {...state, allUnreadNotifs: {loading: false, error: action.payload, notifs: null}}

        default:
            return state;
    }
}