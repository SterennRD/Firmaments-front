import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserSignup from "./components/users/UserSignup";
import Homepage from "./components/Homepage";
import NavBar from "./components/NavBar";
import UserList from "./components/UserList";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <UserList/>
            <Route path="/" component={NavBar} />
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/signup" component={UserSignup} />
                <Route path="/login" component={UserSignup} />
            </Switch>
        </BrowserRouter>
    );
  }
}

export default App;

/*
const mapStateToProps = state => ({

});
export default connect(mapStateToProps)(App)
<Router>
<Route path="/" component={NavBar} />
<Switch>
    <Route exact path="/" component={Homepage} />
    <Route path="/signup" component={UserSignup} />
    <Route path="/login" component={UserSignup} />
</Switch>
</Router>*/
