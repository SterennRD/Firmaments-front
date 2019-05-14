import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../containers/HomeContainer";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Story from "../containers/StoryContainer";
import Profile from "../containers/ProfileContainer";
import User from "./user/User";
import {meFromToken} from "../actions/users";
import Notification from "../containers/NotificationContainer";
import Search from "../containers/SearchContainer";
import "../App.scss"
require('dotenv').config()


class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

        console.log("je reçois des props", this.props.auth.socket)
        if (this.props.auth.socket) {
            console.log(this.props.auth.socket)
            this.props.auth.socket.on("essai", (msg) => {
                console.log("je reçois la notif", msg)
            });
        }

    }
    componentDidUpdate(prevProps) {

        if (this.props.auth.socket) {
            console.log(this.props.auth.socket)
            this.props.auth.socket.on("essai", (msg) => {
                console.log("je reçois la notif", msg)
            });
            this.props.auth.socket.on("receiveComment", (data) => {
                console.log("Nouveau commentaire", data)
                this.props.receiveComment(data)
            });
        }
        const token = localStorage.getItem('jwtToken');
        if (this.props.auth.user !== prevProps.auth.user) {
            if (this.props.auth.user) {
                this.props.getAllUnreadNotifs(this.props.auth.user._id, token)
            }
        }
        if (this.props.notifications.notifComment !== prevProps.notifications.notifComment) {
                this.props.getAllUnreadNotifs(this.props.auth.user._id, token)
        }

    }
    componentDidMount() {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            //store.dispatch(setCurrentUser(jwt_decode(token)))
            this.props.meFromToken(token)
        }

        console.log("le composant se monte", this.props.auth)
        if (this.props.auth.socket) {
            console.log(this.props.auth.socket)
            this.props.auth.socket.on("essai", (msg) => {
                console.log("je reçois la notif", msg)
            });
        }
    }
    render() {

        return (
            <BrowserRouter>

                <Navbar/>
                <Notification notification={this.props.notifications}/>
                <Route exact path="/" component={ Home } />

                <div className="app">
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/login" component={ Login } />
                    <Route path="/stories" component={ Story } />
                    <Route path="/user" component={ User } />
                    <Route path="/search" component={ Search } />
                </div>


            </BrowserRouter>
        );
    }
}

export default App;
