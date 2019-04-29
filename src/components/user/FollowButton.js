import React, {Component} from 'react';

class FollowButton extends Component {

    handleFollow(id) {
        console.log(id)
        const idUser = this.props.user.user._id;
        const token = localStorage.getItem('jwtToken');
        this.props.followUser(idUser, id, token)
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const currentUser = this.props.auth.user;
        const { user, loading, error } = this.props.user.selectedUser;
        let isMyProfile = false;
        let faved;

        if (user && currentUser) {
            faved = currentUser.following.findIndex(item => item._id === user._id);
        }
        return (
            <div>
                <button id={user._id} onClick={ e => this.handleFollow(e.target.id) }> { faved !== -1 ? 'Se désabonner' : 'Suivre'}</button>
            </div>
        );
    }
}

export default FollowButton;