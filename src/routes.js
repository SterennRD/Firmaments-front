import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";

export default (
    <Route path="/" component={App}>
        <Route exact path="/" component={ Home } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/login" component={ Login } />
    </Route>
);