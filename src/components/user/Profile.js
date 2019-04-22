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

        const {isAuthenticated} = this.props.auth;
        const { user, loading, error } = this.props.user;

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
            </div>
        );
    }
}

export default Profile;