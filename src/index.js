import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import { Router, browserHistory } from "react-router-dom";
import {Provider} from "react-redux";
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import App from './containers/AppContainer';
import reducer from "./reducers";
import {SET_CURRENT_USER} from "./actions/types";
import { setCurrentUser} from './actions/authentication';
import jwt_decode from "jwt-decode";
import fontawesome from "@fortawesome/fontawesome-free/js/all";
import {meFromToken} from "./actions/users";

const store = createStore(
    reducer,
    applyMiddleware(thunk),
)

/*const token = localStorage.getItem('jwtToken');

if (token) {
    //store.dispatch(setCurrentUser(jwt_decode(token)))
    store.dispatch(meFromToken(token))
}*/

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
