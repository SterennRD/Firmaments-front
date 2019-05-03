import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import Profile from "../../containers/ProfileContainer";

class User extends Component {
    render() {
        return (
            <div>
                {/* See profile */}
                <Route path={this.props.match.url + '/:id'} component={ Profile } />
            </div>
        );
    }
}

export default User;