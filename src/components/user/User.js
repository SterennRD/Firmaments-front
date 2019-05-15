import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import Profile from "../../containers/ProfileContainer";
import ReadingListDetail from "../../containers/ReadingListDetailContainer";
import ReadingListForm from "../../containers/ReadingListFormContainer";
import Parameters from "../../containers/ParametersContainer";
import NotificationList from "../../containers/NotificationListContainer";

class User extends Component {
    render() {
        return (
            <div>
                {/* See profile */}
                <Route exact path={this.props.match.url + '/profile/:id'} component={Profile} />

                {/* Edit parameters */}
                <Route exact path={this.props.match.url + '/profile/:id/parameters'} component={Parameters} />

                {/* See profile wall */}
                <Route exact path={this.props.match.url + '/profile/:id/wall'} component={Profile} />

                {/* See all stories */}
                <Route path={this.props.match.url + '/profile/:id/stories'} component={ Profile } />

                {/* See all reading lists */}
                <Route path={this.props.match.url + '/reading-lists/:id'} component={ Profile } />

                {/* See reading list */}
                <Route exact path={this.props.match.url + '/reading-list/:id'} component={ ReadingListDetail } />

                {/* Edit reading list */}
                <Route path={this.props.match.url + '/reading-list/:id/edit'} component={ ReadingListForm } />

                {/* See all notifications */}
                <Route path={this.props.match.url + '/profile/:id/notifications'} component={ NotificationList } />
            </div>
        );
    }
}

export default User;