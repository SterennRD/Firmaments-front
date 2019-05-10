import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../containers/HomeContainer";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Story from "../containers/StoryContainer";
import Profile from "../containers/ProfileContainer";
import User from "./user/User";
require('dotenv').config()


class App extends Component {
    render() {
        return (
            <BrowserRouter>

                <Navbar/>

                <Route exact path="/" component={ Home } />

                <div className="container">
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/login" component={ Login } />
                    <Route path="/stories" component={ Story } />
                    <Route path="/user" component={ User } />
                </div>

            </BrowserRouter>
        );
    }
}

export default App;
