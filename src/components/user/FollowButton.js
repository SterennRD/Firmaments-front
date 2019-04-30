import React, {Component} from 'react';

class FollowButton extends Component {

    handleFollow(id) {
        const idUser = this.props.user.user._id;
        const token = localStorage.getItem('jwtToken');
        this.props.followUser(idUser, id, token)
    }

    render() {
        const currentUser = this.props.user.user;
        const { user } = this.props.user.selectedUser;
        const { loading, error } = this.props.user.followedUsers;
        let faved;

        if (currentUser && user) {
            faved = currentUser.following.findIndex(item => item._id === user._id);
        }
        return (
            <div>
                { loading ? (
                    <button disabled>Loading</button>
                ) : (
                    <button id={user._id} onClick={ e => this.handleFollow(e.target.id) }> { faved !== -1 ? 'Se désabonner' : 'Suivre'}</button>
                )}
            </div>
        );
    }
}

export default FollowButton;