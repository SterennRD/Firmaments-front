import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {user} = this.props.auth.user;
        console.log("les props de home")
        console.log(this.props)
        let hello;
        if (user) {
            hello = <div>Hello {user.username}</div>
        } else {
            hello = <div>Connectez-vous</div>
        }
        return (
            <div>
                Home Component
                {hello}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Home);