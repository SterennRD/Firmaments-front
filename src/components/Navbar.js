import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import SearchBar from "../containers/SearchBarContainer";

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPanel: false,
            showNotif: false
        }
        this.showPanel = this.showPanel.bind(this)
        this.showNotif = this.showNotif.bind(this)
    }

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    showPanel() {
        if (this.state.showPanel) {
            this.setState({showPanel : false})
        } else {
            this.setState({showPanel : true, showNotif: false})
        }
    }

    showNotif() {
        if (this.state.showNotif) {
            this.setState({showNotif : false})
        } else {
            this.setState({showNotif : true, showPanel: false})
        }
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {allUnreadNotifs} = this.props.notifications;
        console.log('authenticated navbar')
        console.log(this.props)

        const authLinks = isAuthenticated ? (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <div className="navBar__notif" onClick={this.showNotif}>
                        <i className="fas fa-bell"></i>
                        {allUnreadNotifs.notifs ? <div className="navBar__notif_alert">{allUnreadNotifs.notifs.length}</div> : null}
                        {this.state.showNotif ? (
                            <div className="navBar__notif_panel">
                                {allUnreadNotifs.notifs.slice(0,5).map(notif => <div key={notif._id} className="navBar__notif_panel_item">{notif.message}</div>)}
                                <Link to={"/notifications"}>Voir tout</Link>
                            </div>
                        ): null}
                    </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/user/profile/" + user._id}>{user.username}</Link>
                </li>
                <li className="nav-item navBar__panel">
                    {user.image ?
                        <img className="navBar__img" src="" alt={user.username} onClick={this.showPanel}/>
                    :
                        <div onClick={this.showPanel} className="navBar__img d-flex align-items-center justify-content-center"><i className="fas fa-user"></i></div>
                    }
                    {this.state.showPanel ?
                        <div className="navBar__panel_window">
                            <ul>
                                <li className="navBar__panel_window_usernamed">{user.username_display}</li>
                                <li className="navBar__panel_window_username">{user.username}</li>
                                <hr/>
                                <li><Link className="navBar__link" to={"/user/profile/" + user._id}>Profil</Link></li>
                                <li><Link className="navBar__link" to={"/user/profile/" + user._id + "/parameters"}>Paramètres</Link></li>
                                <li><a href="" className="navBar__link" onClick={this.onLogout.bind(this)}>Déconnexion</a></li>
                            </ul>
                        </div>
                        :
                        null
                    }
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
            <nav className="navBar navbar navbar-expand-lg navbar-light">
                <Link className="navBar__logo navbar-brand" to="/"><img alt="Firmaments" src={process.env.PUBLIC_URL + '/img/logo-firmaments.svg'} /></Link>
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
    auth: state.auth,
    notifications: state.notifications
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
