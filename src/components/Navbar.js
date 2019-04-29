import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import SearchBar from "./SearchBar";

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        console.log('authenticated navbar')
        console.log(this.props)

        const authLinks = isAuthenticated ? (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={"/profile/" + user._id}>{user.username}</Link>
                </li>
                <li>
                    <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
                        <img src="" alt={user.name} title={user.name}
                            className="rounded-circle"
                            style={{ width: '25px', marginRight: '5px'}} />
                                Logout
                    </a>
                </li>
            </ul>
        ) : null;
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Sign In</Link>
            </li>
        </ul>
      )
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Mon app</Link>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/stories">Mes histoires</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/stories/new' className="nav-link">Créer</Link>
                    </li>
                </ul>
                <SearchBar {...this.props} />
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
