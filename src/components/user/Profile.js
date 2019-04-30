import React, {Component} from 'react';
import FollowButton from "../../containers/FollowContainer";

class Profile extends Component {
    fetchData(id) {
        this.props.getUserById(id)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchData(this.props.match.params.id);
        }
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
        const currentUser = this.props.auth.user;
        const { user, loading, error } = this.props.user.selectedUser;
        let isMyProfile = false;

        if (user && currentUser) {
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
        const profileImage = <div className="rounded-circle">i</div>

        return (
            <div>
                <h1>{user.username_display}</h1>
                <h2>@{user.username}</h2>
                {user.image ? 'image de profil' : profileImage}
                <div>{user.followers.length} followers</div>
                <div>{user.following.length} abonnement{user.following.length > 1 ? 's' : ''}</div>
                <div>{user.stories.length} histoire{user.stories.length > 1 ? 's' : ''}</div>
                { isMyProfile ? '' : <FollowButton {...this.props} />}
            </div>
        );
    }
}

export default Profile;