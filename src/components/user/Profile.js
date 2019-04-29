import React, {Component} from 'react';

class Profile extends Component {
    fetchData(id) {
        this.props.getUserById(id)
    }
    componentWillUnmount() {
        this.props.resetMe();
    }
    componentDidMount() {
        const id =this.props.match.params.id;
        this.fetchData(id);
    }

    render() {
        console.log("profil")
        console.log(this.props)

        const { isAuthenticated } = this.props.auth;
        const { user, loading, error } = this.props.user.selectedUser;
        let isMyProfile = false;

        if (user) {
            if ( this.props.auth.user._id === user._id ) {
                isMyProfile = true;
            }
        }

        if (loading) {
            return <div className="container">Loading...</div>;
        } else if(error) {
            return  <div className="alert alert-danger">{error.message}</div>
        } else if(!user) {
            return <span />
        }
        return (
            <div>
                <h1>{user.username_display}</h1>
                <h2>@{user.username}</h2>
                <div>{user.followers.length} followers</div>
                <div>{user.following.length} abonnement{user.followers.length > 1 ? 's' : ''}</div>
                <div>{user.stories.length} histoire{user.stories.length > 1 ? 's' : ''}</div>
                { isMyProfile ? '' : <div>Vous ne suivez pas @{user.username} <button>Suivre</button></div>}
            </div>
        );
    }
}

export default Profile;