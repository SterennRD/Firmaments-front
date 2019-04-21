// actions types
export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const CREATE_TAG = 'CREATE_TAG';
export const REGISTER_USER = 'REGISTER_USER';

// actions creators
export const receiveTags = tags => ({
    type: RECEIVE_TAGS,
    payload: tags
});
export const createTag = tag => ({
    type: CREATE_TAG,
    payload: tag
});
export const registerUser = user => ({
    type: REGISTER_USER,
    payload: user
});

export const fetchUsers = () => {
    return dispatch => {

        return fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => dispatch(receiveTags(users)))
            .catch(error => console.log(error))

    }
};

export const addTag = (tag, cb) => {
    return dispatch => {
        return fetch('http://192.168.56.1:3000/api/tag', {
            method: 'POST',
            body: tag
        })
            .then(response => response.json())
            .then(tag => {
                dispatch(createTag(tag));
                cb();
            })
    }
};

export const addUser = (user, cb) => {
    return dispatch => {
        return fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            body: user
        })
            .then(response => response.json())
            .then(tag => {
                dispatch(registerUser(user));
                cb();
            })
    }
};