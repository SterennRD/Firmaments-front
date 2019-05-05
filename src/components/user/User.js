import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import Profile from "../../containers/ProfileContainer";
import ReadingListDetail from "../../containers/ReadingListDetailContainer";

class User extends Component {
    render() {
        return (
            <div>
                {/* See profile */}
                <Route exact path={this.props.match.url + '/profile/:id'}
                       render={ (props) => <Profile
                           id={props.match.params.id}
                       /> } />

                {/* See all stories */}
                <Route path={this.props.match.url + '/profile/:id/stories'} component={ Profile } />

                {/* See all reading lists */}
                <Route path={this.props.match.url + '/reading-lists/:id'} component={ Profile } />

                {/* See reading list */}
                <Route path={this.props.match.url + '/reading-list/:id'} component={ ReadingListDetail } />
            </div>
        );
    }
}

export default User;