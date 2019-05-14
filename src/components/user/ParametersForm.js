import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import connect from "react-redux/es/connect/connect";
import renderField from "../forms/renderField";
import {editUser} from "../../actions/UserActions";

const validateAndEditUser = (values, dispatch, state)  => {
    console.log("j'édite un user")
    console.log(values)
    const token = localStorage.getItem('jwtToken');
    return dispatch(editUser(values, token))
}

class ParametersForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {}
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.user.editUser.error !== this.props.user.editUser.error) {
            this.setState({
                error: this.props.user.editUser.error
            });
        }
    }

    render() {
        const {handleSubmit, submitting, newPost, mode, pristine, error} = this.props;
        const {isAuthenticated} = this.props.auth;
        const { loading, user } = this.props.user.editUser;
        if (!isAuthenticated) {
            return <div/>
        }
        return (
            <div>
                <form onSubmit={handleSubmit(validateAndEditUser)}>
                    <div className="form-group">
                        <Field
                            name="username"
                            type="username"
                            component={ renderField }
                            label="Nom utilisateur" />
                    </div>

                    <Field
                        name="email"
                        type="email"
                        component={ renderField }
                        label="Adresse email" />
                    <button type="submit" disabled={pristine || submitting}>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

ParametersForm = reduxForm({
    form: 'ParametersForm',  // a unique identifier for this form

    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true,
}, editUser)(ParametersForm);

ParametersForm = connect(
    state => ({
        initialValues: state.user.user,
    })
)(ParametersForm);

export default ParametersForm