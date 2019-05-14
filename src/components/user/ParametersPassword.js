import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authentication';
import classnames from 'classnames';

class ParametersPassword extends Component {

    constructor() {
        super();
        this.state = {
            password: '',
            newPassword: '',
            newPasswordConfirm: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const passwordChange = {
            id: this.props.auth.user._id,
            password: this.state.password,
            newPassword: this.state.newPassword,
            newPasswordConfirm: this.state.newPasswordConfirm,
        }
        const token = localStorage.getItem('jwtToken')
        this.props.changePassword(passwordChange, token);
    }

    componentDidUpdate(prevProps) {
        if(this.props.user.editUser.changePassword.error !== prevProps.user.editUser.changePassword.error) {
            this.setState({
                errors: this.props.user.editUser.changePassword.error
            });
        }
        if(this.props.user.editUser.changePassword.password !== prevProps.user.editUser.changePassword.password) {
            this.setState({
                password: this.state.password,
                newPassword: this.state.newPassword,
                newPasswordConfirm: this.state.newPasswordConfirm,
            });
        }
    }

    render() {
        const { errors } = this.state;
        const { password } = this.props.user.editUser.changePassword;
        return(
            <div>
                <h2>Changer le mot de passe</h2>
                <form onSubmit={ this.handleSubmit }>
                    {password ? (
                        <div className="alert alert-success">
                            Mot de passe changé !
                        </div>
                    ) : (
                        null
                    )}
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            name="password"
                            id="password"
                            onChange={ this.handleInputChange }
                            value={ this.state.password }
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">Nouveau mot de passe</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.newPassword
                            })}
                            name="newPassword"
                            id="newPassword"
                            onChange={ this.handleInputChange }
                            value={ this.state.newPassword }
                        />
                        {errors.newPassword && (<div className="invalid-feedback">{errors.newPassword}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPasswordConfirm">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password_confirm
                            })}
                            name="newPasswordConfirm"
                            id="newPasswordConfirm"
                            onChange={ this.handleInputChange }
                            value={ this.state.newPasswordConfirm }
                        />
                        {errors.newPasswordConfirm && (<div className="invalid-feedback">{errors.newPasswordConfirm}</div>)}
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Register User
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ParametersPassword;