export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// GET
export const GET_ALL_STORIES  = 'GET_ALL_STORIES';
export const GET_ALL_STORIES_SUCCESS  = 'GET_ALL_STORIES_SUCCESS';
export const GET_ALL_STORIES_ERROR  = 'GET_ALL_STORIES_ERROR';
export const RESET_ALL_STORIES  = 'RESET_ALL_STORIES';


export const GET_STORY_FROM_USER  = 'GET_STORY_FROM_USER';
export const GET_STORY_FROM_USER_SUCCESS  = 'GET_STORY_FROM_USER_SUCCESS';
export const GET_STORY_FROM_USER_ERROR  = 'GET_STORY_FROM_USER_ERROR';
export const RESET_STORY_FROM_USER  = 'RESET_STORY_FROM_USER';

export const GET_STORY_FROM_ID = 'GET_STORY_FROM_ID';
export const GET_STORY_SUCCESS = 'GET_STORY_SUCCESS';
export const GET_STORY_ERROR = 'GET_STORY_ERROR';
export const RESET_SELECTED_STORY = 'RESET_SELECTED_STORY';

export const GET_LAST_STORIES = 'GET_LAST_STORIES';
export const GET_LAST_STORIES_SUCCESS = 'GET_LAST_STORIES_SUCCESS';
export const GET_LAST_STORIES_ERROR = 'GET_LAST_STORIES_ERROR';
export const RESET_LAST_STORIES = 'RESET_LAST_STORIES';


export const GET_CHAPTER_BY_ID = 'GET_CHAPTER_BY_ID';
export const GET_CHAPTER_SUCCESS = 'GET_CHAPTER_SUCCESS';
export const GET_CHAPTER_ERROR = 'GET_CHAPTER_ERROR';
export const RESET_SELECTED_CHAPTER = 'RESET_SELECTED_CHAPTER';

// CREATE
export const CREATE_STORY = 'CREATE_STORY';
export const CREATE_STORY_SUCCESS = 'CREATE_STORY_SUCCESS';
export const CREATE_STORY_FAILURE = 'CREATE_STORY_FAILURE';
export const RESET_NEW_STORY = 'RESET_NEW_STORY';

export const CREATE_CHAPTER = 'CREATE_CHAPTER';
export const CREATE_CHAPTER_SUCCESS = 'CREATE_CHAPTER_SUCCESS';
export const CREATE_CHAPTER_FAILURE = 'CREATE_CHAPTER_FAILURE';
export const RESET_NEW_CHAPTER = 'RESET_NEW_CHAPTER';

// DELETE
export const DELETE_STORY = 'DELETE_STORY';
export const DELETE_STORY_SUCCESS = 'DELETE_STORY_SUCCESS';
export const DELETE_STORY_FAILURE = 'DELETE_STORY_FAILURE';
export const RESET_DELETED_STORY = 'RESET_DELETED_STORY';

// EDIT
export const EDIT_STORY = 'EDIT_STORY';
export const EDIT_STORY_SUCCESS = 'EDIT_STORY_SUCCESS';
export const EDIT_STORY_FAILURE = 'EDIT_STORY_FAILURE';
export const RESET_EDIT_STORY = 'RESET_EDIT_STORY';

// EDIT CHAPTER
export const EDIT_CHAPTER = 'EDIT_CHAPTER';
export const EDIT_CHAPTER_SUCCESS = 'EDIT_CHAPTER_SUCCESS';
export const EDIT_CHAPTER_FAILURE = 'EDIT_CHAPTER_FAILURE';
export const RESET_EDIT_CHAPTER = 'RESET_EDIT_CHAPTER';

export const DELETE_CHAPTER = 'DELETE_CHAPTER';
export const DELETE_CHAPTER_SUCCESS = 'DELETE_CHAPTER_SUCCESS';
export const DELETE_CHAPTER_FAILURE = 'DELETE_CHAPTER_FAILURE';
export const RESET_DELETED_CHAPTER = 'RESET_DELETED_CHAPTER';

//Validate post fields like Title, Categries on the server
export const VALIDATE_POST_FIELDS = 'VALIDATE_POST_FIELDS';
export const VALIDATE_POST_FIELDS_SUCCESS = 'VALIDATE_POST_FIELDS_SUCCESS';
export const VALIDATE_POST_FIELDS_FAILURE = 'VALIDATE_POST_FIELDS_FAILURE';
export const RESET_POST_FIELDS = 'RESET_POST_FIELDS';

export const LOAD = 'LOAD';
export const EDIT_MODE = 'EDIT_MODE';
export const EDIT_MODE_RESET = 'EDIT_MODE_RESET';
export const RESET_FORM = 'RESET_FORM';
export const CREATE_MODE = 'CREATE_MODE';

export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';
export const RESET_SELECTED_USER = 'RESET_SELECTED_USER';

export const EDIT_USER = 'EDIT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_ERROR = 'EDIT_USER_ERROR';
export const RESET_EDITED_USER = 'RESET_EDITED_USER'

export const LIKE_STORY = 'LIKE_STORY';
export const LIKE_STORY_SUCCESS = 'LIKE_STORY_SUCCESS';
export const LIKE_STORY_ERROR = 'LIKE_STORY_ERROR';

export const FOLLOW_USER = 'FOLLOW_USER';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_ERROR = 'FOLLOW_USER_ERROR';

//Get current user(me) from token in localStorage
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';

export const GET_READING_LISTS = 'GET_READING_LISTS';
export const GET_READING_LISTS_SUCCESS = 'GET_READING_LISTS_SUCCESS';
export const GET_READING_LISTS_ERROR = 'GET_READING_LISTS_ERROR';
export const RESET_READING_LISTS = 'RESET_READING_LISTS';

export const GET_READING_LIST = 'GET_READING_LIST';
export const GET_READING_LIST_SUCCESS = 'GET_READING_LIST_SUCCESS';
export const GET_READING_LIST_ERROR = 'GET_READING_LIST_ERROR';
export const RESET_READING_LIST = 'RESET_READING_LIST';

export const ADD_TO_READING_LIST = 'ADD_TO_READING_LIST';
export const ADD_TO_READING_LIST_SUCCESS = 'ADD_TO_READING_LIST_SUCCESS';
export const ADD_TO_READING_LIST_ERROR = 'ADD_TO_READING_LIST_ERROR';

export const CREATE_READING_LIST = 'CREATE_READING_LIST';
export const CREATE_READING_LIST_SUCCESS = 'CREATE_READING_LIST_SUCCESS';
export const CREATE_READING_LIST_ERROR = 'CREATE_READING_LIST_ERROR';
export const RESET_NEW_READING_LIST = 'RESET_NEW_READING_LIST';

export const EDIT_READING_LIST = 'EDIT_READING_LIST';
export const EDIT_READING_LIST_SUCCESS = 'EDIT_READING_LIST_SUCCESS';
export const EDIT_READING_LIST_ERROR = 'EDIT_READING_LIST_ERROR';
export const RESET_EDIT_READING_LIST = 'RESET_EDIT_READING_LIST';

export const DELETE_READING_LIST = 'DELETE_READING_LIST';
export const DELETE_READING_LIST_SUCCESS = 'DELETE_READING_LIST_SUCCESS';
export const DELETE_READING_LIST_ERROR = 'DELETE_READING_LIST_ERROR';
export const RESET_DELETE_READING_LIST = 'RESET_DELETE_READING_LIST';

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';
export const RESET_ADDED_COMMENT = 'RESET_ADDED_COMMENT';

export const GET_ALL_NOTIFS = 'GET_ALL_NOTIFS';
export const GET_ALL_NOTIFS_SUCCESS = 'GET_ALL_NOTIFS_SUCCESS';
export const GET_ALL_NOTIFS_ERROR = 'GET_ALL_NOTIFS_ERROR';

export const GET_ALL_UNREAD_NOTIFS = 'GET_ALL_UNREAD_NOTIFS';
export const GET_ALL_UNREAD_NOTIFS_SUCCESS = 'GET_ALL_UNREAD_NOTIFS_SUCCESS';
export const GET_ALL_UNREAD_NOTIFS_ERROR = 'GET_ALL_UNREAD_NOTIFS_ERROR';


export const NOTIF_NEW_COMMENT = 'NOTIF_NEW_COMMENT';
export const RESET_NOTIF_NEW_COMMENT = 'RESET_NOTIF_NEW_COMMENT';

export const SEARCH = 'SEARCH';
export const SEARCH_STORY_SUCCESS = 'SEARCH_STORY_SUCCESS';
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const RESET_SEARCH = 'RESET_SEARCH';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';
export const CHANGE_PASSWORD_RESET = 'CHANGE_PASSWORD_RESET';