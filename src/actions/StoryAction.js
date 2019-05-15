import axios from 'axios';
import {
    GET_ALL_STORIES, GET_ALL_STORIES_SUCCESS, GET_ALL_STORIES_ERROR, RESET_ALL_STORIES,
    GET_STORY_FROM_USER, GET_STORY_FROM_USER_SUCCESS, GET_STORY_FROM_USER_ERROR, RESET_STORY_FROM_USER,
    GET_STORY_FROM_ID, GET_STORY_SUCCESS, GET_STORY_ERROR, RESET_SELECTED_STORY,
    GET_LAST_STORIES, GET_LAST_STORIES_SUCCESS, GET_LAST_STORIES_ERROR, RESET_LAST_STORIES,
    DELETE_STORY, DELETE_STORY_FAILURE, DELETE_STORY_SUCCESS, RESET_DELETED_STORY,
    GET_CHAPTER_BY_ID, GET_CHAPTER_SUCCESS, GET_CHAPTER_ERROR, RESET_SELECTED_CHAPTER,
    CREATE_STORY, CREATE_STORY_SUCCESS, CREATE_STORY_FAILURE, RESET_NEW_STORY,
    CREATE_CHAPTER, CREATE_CHAPTER_SUCCESS, CREATE_CHAPTER_FAILURE, RESET_NEW_CHAPTER,
    EDIT_STORY, EDIT_STORY_SUCCESS, EDIT_STORY_FAILURE, RESET_EDIT_STORY,
    EDIT_CHAPTER, EDIT_CHAPTER_SUCCESS, EDIT_CHAPTER_FAILURE, RESET_EDIT_CHAPTER,
    VALIDATE_POST_FIELDS,VALIDATE_POST_FIELDS_SUCCESS, VALIDATE_POST_FIELDS_FAILURE, RESET_POST_FIELDS,
    LOAD, EDIT_MODE, EDIT_MODE_RESET, RESET_FORM, CREATE_MODE,
    LIKE_STORY, LIKE_STORY_SUCCESS, LIKE_STORY_ERROR,
    ADD_TO_READING_LIST, ADD_TO_READING_LIST_SUCCESS, ADD_TO_READING_LIST_ERROR,
    ADD_COMMENT, ADD_COMMENT_SUCCESS, ADD_COMMENT_ERROR, RESET_ADDED_COMMENT,
    DELETE_CHAPTER, DELETE_CHAPTER_SUCCESS, DELETE_CHAPTER_FAILURE, RESET_DELETED_CHAPTER,
    ADD_CHAPTER_TO_READ,ADD_CHAPTER_TO_READ_SUCCESS, ADD_CHAPTER_TO_READ_ERROR, ADD_CHAPTER_TO_READ_RESET,
} from './types';

const jwt = require('jsonwebtoken');



const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/stories' : '/stories';

export const getAllStories = (page) => dispatch => {
    dispatch({type: GET_ALL_STORIES})
    if (page == undefined || !page) {
        page = 1
    }
    axios.get(`${ROOT_URL}/all/${page}`)
        .then(function(response) {
            console.log(response)
            if (response.status === 200){
                dispatch({type: GET_ALL_STORIES_SUCCESS, payload: response.data})
            } else {
                dispatch({type: GET_ALL_STORIES_ERROR, payload: response.data})
            }
        })
        .catch(function(error) {
            dispatch({type: GET_ALL_STORIES_ERROR, payload: error.data})
        })
}

export function resetAllStories() {
    return {
        type: RESET_ALL_STORIES
    }
}

export const getStory = (user) => dispatch => {
    dispatch({type: GET_STORY_FROM_USER})
    axios.get(`${ROOT_URL}/user/${user}`)
        .then(function(response) {
            console.log(response)
            if (response.status === 200){
                dispatch({type: GET_STORY_FROM_USER_SUCCESS, payload: response.data})
            } else {
                dispatch({type: GET_STORY_FROM_USER_ERROR, payload: response.data})
            }
        })
        .catch(function(error) {
            dispatch({type: GET_STORY_FROM_USER_ERROR, payload: error.data})
        })

    //socket.emit('my other event', { my: 'data' });
}

export function resetStoryFromUser() {
    return {
        type: RESET_STORY_FROM_USER
    }
}

export const getStoryById = (story) => {

    return function(dispatch) {
        dispatch({type: GET_STORY_FROM_ID})

        axios.get(`${ROOT_URL}/${story}`)
            .then(function(response) {
                console.log(response)
                if (response.status === 200){
                    dispatch({type: GET_STORY_SUCCESS, payload: response.data})
                } else {
                    dispatch({type: GET_STORY_ERROR, payload: response.data})
                }
            })
            .catch(function(error) {
                console.log(error.response)

                dispatch({type: GET_STORY_ERROR, payload: error.data})
            })
    }
    //return request
}

export function resetSelectedStory() {
    return {
        type: RESET_SELECTED_STORY
    }
}

export const deleteStory = (id) => dispatch => {
    const token = localStorage.getItem('jwtToken');
    console.log("Je passe dans l'action supprimer")
    dispatch({type: DELETE_STORY})
    axios({
        method: 'delete',
        url: `${ROOT_URL}/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    })
        .then(res => {
            console.log(res)
            dispatch({type: DELETE_STORY_SUCCESS, payload: res.data})
        })
        .catch(err => {
            console.log(err)
            dispatch({type: DELETE_STORY_FAILURE, payload: err})
        });

}
export function resetDeletedStory() {
    return {
        type: RESET_DELETED_STORY
    }
}

export const listStories = decoded => {
    return {
        type: GET_STORY_FROM_USER,
        payload: decoded
    }
}
export const detailsStory = story => {
    return {
        type: GET_STORY_FROM_ID,
        payload: story
    }
}

export function validatePostFields(props) {
    //note: we cant have /posts/validateFields because it'll match /posts/:id path!
    const request = axios.post(`${ROOT_URL}/posts/validate/fields`, props);

    return {
        type: VALIDATE_POST_FIELDS,
        payload: request
    };
}

export function validatePostFieldsSuccess() {
    return {
        type: VALIDATE_POST_FIELDS_SUCCESS
    };
}

export function validatePostFieldsFailure(error) {
    return {
        type: VALIDATE_POST_FIELDS_FAILURE,
        payload: error
    };
}

export function resetPostFields() {
    return {
        type: RESET_POST_FIELDS
    }
}
;

export const createStory = (props, tokenFromStorage) => dispatch => {
    console.log("je crée une histoire")
    console.log(props)
    axios({
        method: 'post',
        data: props,
        url: `${ROOT_URL}`,
        headers: {
            'x-access-token': tokenFromStorage
        }
    })
        .then((response) => {
            console.log("La response qui revient")
            console.log(response)
            if (response.status === 200){
                dispatch({type: CREATE_STORY_SUCCESS, payload: response.data})
            } else {
                dispatch({type: CREATE_STORY_FAILURE, payload: response.data})
            }
        })
        .catch((error) => {
            dispatch({type: CREATE_STORY_FAILURE, payload: error})
        })
}

export function createStorySuccess(newStory) {
    return {
        type: CREATE_STORY_SUCCESS,
        payload: newStory
    };
}

export function createStoryFailure(error) {
    return {
        type: CREATE_STORY_FAILURE,
        payload: error
    };
}

export function resetNewStory() {
    return {
        type: RESET_NEW_STORY
    }
}

/*export const getStoryToEdit = (id) => dispatch => {
    if (id) {
        axios.get(`${ROOT_URL}/${story}`)
            .then(function(response) {
                console.log(response)
                if (response.status === 200){
                    dispatch({type: GET_STORY_SUCCESS, payload: response.data})
                } else {
                    dispatch({type: GET_STORY_ERROR, payload: response.data})
                }
            })
            .catch(function(error) {
                console.log(error)

                dispatch({type: GET_STORY_ERROR, payload: error.data})
            })
    }
}*/

export const editStory = (props, tokenFromStorage) => dispatch => {

    var postData = JSON.stringify(props);

    let formData = new FormData()
    if (props.cover) {
        formData.append('cover', props.cover[0])
    }
    formData.append("postData",postData );

    for(var pair of formData.entries()) {
        console.log(pair[0]+', '+pair[1]);
    }

    dispatch({type: EDIT_STORY})
    axios({
        method: 'post',
        data: formData,
        url: `${ROOT_URL}/edit/${props._id}`,
        headers: {
            'x-access-token': tokenFromStorage
        }
    })
        .then((response) => {
            console.log("La response qui revient")
            console.log(response)
            if (response.status === 200){
                dispatch({type: EDIT_STORY_SUCCESS, payload: response.data})
            } else {
               dispatch({type: EDIT_STORY_FAILURE, payload: response.data})
            }
        })
        .catch((error) => {
            dispatch({type: EDIT_STORY_FAILURE, payload: error.response.data})
        })
}
export const resetEditStory = () => {
    return {
        type: RESET_EDIT_STORY
    }
}

export function load(data) {
    console.log("je passe dans l'action load")
    console.log(data)
    return {
        type: LOAD,
        payload: data
    }
}

export const editMode = () => {
    return {
        type: EDIT_MODE,
        payload: true
    }
}
export const resetEditMode = () => {
    return {
        type: EDIT_MODE_RESET,
        payload: false
    }
}
export const createMode = () => {
    return {
        type: CREATE_MODE,
        payload: {
            title: '',
            description: '',
            rating: {id: 1, label: 'Tout public'},
            status: {id: 1, label: 'En cours'},
            comment_authorized: true,
            annotation_authorized: true
        }
    }
}
export function resetForm() {
    return {
        type: RESET_FORM
    }
}

export const getChapterById = (story, chapter) => {

    return function(dispatch) {
        dispatch({type: GET_CHAPTER_BY_ID})

        axios.get(`${ROOT_URL}/${story}/chapter/${chapter}`)
            .then(function(response) {
                console.log("get chapter response")
                console.log(response)
                if (response.status === 200){
                    dispatch({type: GET_CHAPTER_SUCCESS, payload: response.data})
                } else {
                    dispatch({type: GET_CHAPTER_ERROR, payload: response.data})
                }
            })
            .catch(function(error) {
                console.log(error)

                dispatch({type: GET_CHAPTER_ERROR, payload: error.data})
            })
    }
}
export function resetSelectedChapter() {
    return {
        type: RESET_SELECTED_CHAPTER
    }
}
export const editChapter = (props, id, tokenFromStorage) => dispatch => {
    console.log("j'édite un chapitre")
    console.log(props)
    console.log(props._id)
    console.log(id)
    axios({
        method: 'post',
        data: props,
        url: `${ROOT_URL}/${id}/chapter/${props._id}/edit`,
        headers: {
            'x-access-token': tokenFromStorage
        }
    })
        .then((response) => {
            console.log("La response qui revient")
            console.log(response)
            if (response.status === 200){
                dispatch({type: EDIT_CHAPTER_SUCCESS, payload: response.data})
            } else {
                console.log(response)
                dispatch({type: EDIT_CHAPTER_FAILURE, payload: response.data})
            }
        })
        .catch((error) => {
            dispatch({type: EDIT_CHAPTER_FAILURE, payload: error})
        })
}
export const resetEditChapter = () => {
    return {
        type: RESET_EDIT_CHAPTER
    }
}

export const createChapter = (props, id, tokenFromStorage) => dispatch => {

    dispatch({ type: CREATE_CHAPTER });
    axios({
        method: 'post',
        data: props,
        url: `${ROOT_URL}/${id}/new/chapter`,
        headers: {
            'x-access-token': tokenFromStorage
        }
    })
        .then((response) => {
            console.log("La response qui revient")
            console.log(response)
            if (response.status === 200){
                dispatch({type: CREATE_CHAPTER_SUCCESS, payload: response.data})
            } else {
                console.log(response)
                dispatch({type: CREATE_CHAPTER_FAILURE, payload: response.data})
            }
        })
        .catch((error) => {
            dispatch({type: CREATE_CHAPTER_FAILURE, payload: error})
        })
}
export const resetNewChapter = () => {
    return {
        type: RESET_NEW_CHAPTER
    }
}

export const getLastStories = () => dispatch => {
    dispatch({ type: GET_LAST_STORIES });
    axios.get(`${ROOT_URL}/last/posted`)
        .then((response) => {
            console.log("la response get last stories")
            console.log(response)
            if (response.status === 200){
                dispatch({type: GET_LAST_STORIES_SUCCESS, payload: response.data})
            } else {
                console.log(response)
                dispatch({type: GET_LAST_STORIES_ERROR, payload: response.data})
            }
        })
        .catch((error) => {
            dispatch({type: GET_LAST_STORIES_ERROR, payload: error})
        })
}

export const resetLastStories = () => {
    return {
        type: RESET_LAST_STORIES
    }
}

export const likeStory = (id, idUser, tokenFromStorage) => dispatch => {

    dispatch({type: LIKE_STORY})
    console.log("dispatch like")
    console.log(id)
    console.log(idUser)
    axios({
        method: 'post',
        data: {id: idUser},
        url: `${ROOT_URL}/like/${id}`,
        headers: {
            'x-access-token': tokenFromStorage
        }
    })
        .then((response) => {
            if (response.status === 200){
                dispatch({type: LIKE_STORY_SUCCESS, payload: response.data})
            } else {
                dispatch({type: LIKE_STORY_ERROR, payload: response.data})
            }
        })
        .catch((error) => {
            dispatch({type: LIKE_STORY_ERROR, payload: error})
        })

}

export const addComment = (props, id, tokenFromStorage, socket) => dispatch => {

    dispatch({type: ADD_COMMENT})
    axios({
        method: 'post',
        data: props,
        url: `${ROOT_URL}/chapter/${id}/add-comment`,
        headers: {
            'x-access-token': tokenFromStorage
        }
    })
        .then((response) => {
            if (response.status === 200){
                console.log("add comment", response)
                dispatch({type: ADD_COMMENT_SUCCESS, payload: response.data})
                let user_from = response.data.comments[0].author._id;
                let chapter = response.data._id;
                socket.emit('newComment', {
                    message: 'Un nouveau commentaire a été posté',
                    user_from: user_from,
                    chapter_id: chapter
                }, user_from);
            } else {
                dispatch({type: ADD_COMMENT_ERROR, payload: response.data})
            }
        })
        .catch((error) => {
            dispatch({type: ADD_COMMENT_ERROR, payload: error})
        })

}
export const resetAddedComment = () => {
    return {
        type: RESET_ADDED_COMMENT
    }
}

export const deleteChapter = (id) => dispatch => {
    const token = localStorage.getItem('jwtToken');
    dispatch({type: DELETE_CHAPTER})
    axios({
        method: 'post',
        url: `${ROOT_URL}/chapter/delete/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    })
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                dispatch({type: DELETE_CHAPTER_SUCCESS, payload: res.data})
            } else {
                dispatch({type: DELETE_CHAPTER_FAILURE, payload: res.data})
            }
        })
        .catch(err => {
            dispatch({type: DELETE_CHAPTER_FAILURE, payload: err.response.data.message})
        });

}
export function resetDeletedChapter() {
    return {
        type: RESET_DELETED_CHAPTER
    }
}

export const addChapterToRead = (id, idChapter, token, socket) => dispatch => {
    dispatch({type: ADD_CHAPTER_TO_READ})
    console.log("je lance l'action lire")
    axios({
        method: 'post',
        url: `${ROOT_URL}/chapter/read/${idChapter}/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    })
        .then(res => {
            console.log("chapitre lu", res)
            if (res.status === 200) {
                console.log("code 200")
                const chapter = res.data.chapters.filter(c => c._id === idChapter)
                dispatch({type: ADD_CHAPTER_TO_READ_SUCCESS, payload: chapter[0]})
                socket.emit('readChapter', {
                    message: 'Chapitre ajouté aux chapitres lus',
                    user_from: id,
                    user_to: id,
                    chapter_id: idChapter
                });
            } else {
                //dispatch({type: ADD_CHAPTER_TO_READ_ERROR, payload: res.data})
            }
        })
        .catch(err => {
            console.log("lu erreur", err.response)
            //dispatch({type: ADD_CHAPTER_TO_READ_ERROR, payload: err.response.data.message})
        });

}
export function resetReadChapter() {
    return {
        type: ADD_CHAPTER_TO_READ_RESET
    }
}