import {
    GET_USER_BY_ID, GET_USER_SUCCESS, GET_USER_ERROR, RESET_SELECTED_USER,
    ME_FROM_TOKEN, ME_FROM_TOKEN_SUCCESS, ME_FROM_TOKEN_FAILURE, RESET_TOKEN,
    FOLLOW_USER, FOLLOW_USER_ERROR, FOLLOW_USER_SUCCESS,
    GET_READING_LISTS, GET_READING_LISTS_SUCCESS, GET_READING_LISTS_ERROR, RESET_READING_LISTS,
    GET_READING_LIST, GET_READING_LIST_SUCCESS, GET_READING_LIST_ERROR, RESET_READING_LIST,
    ADD_TO_READING_LIST, ADD_TO_READING_LIST_SUCCESS, ADD_TO_READING_LIST_ERROR,
    CREATE_READING_LIST, CREATE_READING_LIST_SUCCESS, CREATE_READING_LIST_ERROR, RESET_NEW_READING_LIST,
    EDIT_READING_LIST, EDIT_READING_LIST_SUCCESS, EDIT_READING_LIST_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
    user: null, status:null, error:null, loading: false, isAuthenticated: false,
    selectedUser: {user: null, status:null, error:null, loading: false},
    followedUsers: { loading: false, error: null},
    userReadingLists: { loading: false, error: null, readingLists: []},
    selectedReadingList: { loading: false, error: null, readingList: null},
    newReadingList: {loading: false, error: null, readingList: null},
    editReadingList: {loading: false, error: null, readingList: null}
};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {

        case GET_USER_BY_ID:
            return {...state, selectedUser: { ...state.selectedUser, loading: true}}
        case GET_USER_SUCCESS:
            console.log("get user success", action.payload)
            return {...state, selectedUser: {loading: false, user: action.payload, error: null}}
        case GET_USER_ERROR:
            return {...state, selectedUser: {loading: false, error: action.payload, user: null}}
        case RESET_SELECTED_USER:
            return {...state, selectedUser: {loading: false, error: null, user: null}}

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

        case GET_READING_LIST:
            return {...state, selectedReadingList: {...state.selectedReadingList, loading: true}}
        case GET_READING_LIST_SUCCESS:
            return {...state, selectedReadingList: { loading: false, error: null, readingList: action.payload}}
        case RESET_READING_LIST:
            return {...state, selectedReadingList: { loading: false, error: null, readingList: null }}

        case ADD_TO_READING_LIST:
            for (var i in state.userReadingLists.readingLists) {
                if (state.userReadingLists.readingLists[i]._id == action.payload) {
                    state.userReadingLists.readingLists[i].loading = true;
                    break
                }
            }
            return {...state, userReadingLists: { ...state.userReadingLists } }
        case ADD_TO_READING_LIST_SUCCESS:
            console.log("je passe dans user reducer")
            let newState = state

            if (newState.selectedReadingList.readingList) {
                if (newState.selectedReadingList.readingList.stories) {
                    for (var i in newState.selectedReadingList.readingList.stories) {
                        if (newState.selectedReadingList.readingList.stories[i]._id === action.payload.story._id) {
                            newState.selectedReadingList.readingList.stories[i].nb_favorites = action.payload.story.nb_favorites;
                            break
                        }
                    }
                }
            }

            for (let i = 0; i < newState.userReadingLists.readingLists.length; i++) {
                if (newState.userReadingLists.readingLists[i]._id == action.payload.user._id) {
                    newState.userReadingLists.readingLists[i] = action.payload.user
                    break
                }
            }

            if (newState.selectedUser.user) {
                if (newState.selectedUser.user.stories) {
                    for (var i in newState.selectedUser.user.stories) {
                        if (newState.selectedUser.user.stories[i]._id == action.payload.story._id) {
                            newState.selectedUser.user.stories[i].nb_favorites = action.payload.story.nb_favorites;
                            break
                        }
                    }
                }
            }
            return {...newState}
            /*if (state.selectedUser.user.stories) {
                        console.log("il y a un user sélectionné")
                        for (var i in newState.selectedUser.user.stories) {
                            if (newState.selectedUser.user.stories[i]._id == action.payload.story._id) {
                                newState.selectedUser.user.stories[i].nb_favorites = action.payload.story.nb_favorites;
                                break
                            }
                        }
                        for (var i in newState.selectedReadingList.readingList.stories) {
                            if (newState.selectedReadingList.readingList.stories[i]._id == action.payload.story._id) {
                                newState.selectedReadingList.readingList.stories[i].nb_favorites = action.payload.story.nb_favorites;
                                break
                            }
                        }
                        console.log("coucou")
                        newState = {...newState,
                            selectedUser: {...newState.selectedUser, user: {...newState.selectedUser.user, stories: newState.selectedUser.user.stories}}
                        }
                    }
                    if (state.selectedReadingList.readingList.stories) {
                        console.log("il y a une reading list sélectionnée")
                        for (var i in newState.selectedReadingList.readingList.stories) {
                            if (newState.selectedReadingList.readingList.stories[i]._id == action.payload.story._id) {
                                newState.selectedReadingList.readingList.stories[i].nb_favorites = action.payload.story.nb_favorites;
                                break
                            }
                        }
                        newState = {...state,
                            selectedReadingList: {...state.selectedReadingList, readingList: {...state.selectedReadingList.readingList, stories: newState.selectedReadingList.readingList.stories}}
                        }
                    }
                    if (state.userReadingLists.readingLists) {
                        for (let i = 0; i < newState.userReadingLists.readingLists.length; i++) {
                            console.log("*****", newState.userReadingLists.readingLists[i] )
                            if (newState.userReadingLists.readingLists[i]._id == action.payload.user._id) {
                                console.log("j'entre dans le if")
                                newState.userReadingLists.readingLists[i] = action.payload.user
                                break
                            }
                        }
                        console.log("sortie du if")
                        newState = {...state, userReadingLists: { ...state.userReadingLists, readingLists: newState.userReadingLists.readingLists }}
                    }


                    console.log("je sors du if")
                    console.log("je continue")

                    console.log("données reçues", action.payload)
                    console.log("avant", state)
                    console.log("après",newState)
                    return newState*/
            /*
            return {
                ...state,
                selectedUser: {...state.selectedUser, user: {...state.selectedUser.user, stories: newState.selectedUser.user.stories}},
                userReadingLists: { ...state.userReadingLists, readingLists: newState.userReadingLists.readingLists },
                selectedReadingList: {...state.selectedReadingList, readingList: {...state.selectedReadingList.readingList, stories: newState.selectedReadingList.readingList.stories}}
            }
            for (let i = 0; i < newState.userReadingLists.readingLists.length; i++) {
                console.log("*****", newState.userReadingLists.readingLists[i] )
                if (newState.userReadingLists.readingLists[i]._id == action.payload.user._id) {
                    console.log("j'entre dans le if")
                    newState.userReadingLists.readingLists[i] = action.payload.user
                    break
                }
            }
            console.log("je sors du if")
            console.log("données reçues", action.payload.user)
            console.log("avant", state.userReadingLists.readingLists)
            console.log("après",newState)
            if (state.selectedReadingList.readingList.stories) {
                console.log("il y a une reading list sélectionnée")
                for (var i in state.selectedReadingList.readingList.stories) {
                    if (state.selectedReadingList.readingList.stories[i]._id == action.payload.story._id) {
                        state.selectedReadingList.readingList.stories[i].nb_favorites = action.payload.story.nb_favorites;
                        break
                    }
                }
                return {...state, selectedReadingList: {...state.selectedReadingList, readingList: {...state.selectedReadingList.readingList, stories: state.selectedReadingList.readingList.stories}}, userReadingLists: { ...state.userReadingLists, readingLists: newState }}
            }
            if (newState.selectedReadingList.readingList.stories) {
                console.log("il y a une reading list sélectionnée")
                for (var i in newState.selectedReadingList.readingList.stories) {
                    if (newState.selectedReadingList.readingList.stories[i]._id == action.payload.story._id) {
                        newState.selectedReadingList.readingList.stories[i].nb_favorites = action.payload.story.nb_favorites;
                        break
                    }
                }
            }
            console.log("je continue")
            if (newState.selectedUser.user.stories) {
                console.log("il y a un user sélectionné")
                for (var i in newState.selectedUser.user.stories) {
                    if (newState.selectedUser.user.stories[i]._id == action.payload.story._id) {
                        newState.selectedUser.user.stories[i].nb_favorites = action.payload.story.nb_favorites;
                        break
                    }
                }
            }
            console.log("données reçues", action.payload)
            console.log("avant", state)
            console.log("après",newState)
            return {
                ...state,
                selectedUser: {...state.selectedUser, user: {...state.selectedUser.user, stories: newState.selectedUser.user.stories}},
                userReadingLists: { ...state.userReadingLists, readingLists: newState.userReadingLists.readingLists },
                selectedReadingList: {...state.selectedReadingList, readingList: {...state.selectedReadingList.readingList, stories: newState.selectedReadingList.readingList.stories}}
            }*/

        case ADD_TO_READING_LIST_ERROR:
            return {...state, userReadingLists: { ...state.userReadingLists, error: action.payload }}

        case CREATE_READING_LIST:
            return {...state, newReadingList: {...state.newReadingList, loading: true}}
        case CREATE_READING_LIST_SUCCESS:
            console.log("je passe dans create rl success", action.payload)
            newState = state.userReadingLists
            newState.readingLists.unshift(action.payload.readingList)
            return {...state, newReadingList: { loading: false, readingList: action.payload, error: null}, userReadingLists: { ...state.userReadingLists, newState }}
        case CREATE_READING_LIST_ERROR:
            return {...state, newReadingList: { loading: false, error: action.payload, readingList: null}}
        case RESET_NEW_READING_LIST:
            return {...state, newReadingList: { loading: false, error: null, readingList: null}}

        case EDIT_READING_LIST:
            return {...state, editReadingList: {...state.editReadingList, loading: true}}
        case EDIT_READING_LIST_SUCCESS:
            return {...state, editReadingList: {loading: false, error: null, readingList: action.payload}}
        case EDIT_READING_LIST_ERROR:
            return {...state, editReadingList: {loading: false, error: action.payload, readingList: null}}

        default:
            return state;
    }
}