import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import connect from "react-redux/es/connect/connect";
import renderField from "../forms/renderField";
import {editUser} from "../../actions/UserActions";
import ParametersForm from "./ParametersForm";
import ParametersPassword from "../../containers/ParametersPasswordContainer";

const validateAndEditUser = (values, dispatch, state)  => {
    console.log("j'édite un user")
    console.log(values)
    const token = localStorage.getItem('jwtToken');
    return dispatch(editUser(values, token))
}

class Parameters extends Component {
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
            <div className="parameters">
                <div className="parameters__header">
                    <h1 className="parameters__header_title">Paramètres</h1>
                    <h2 className="parameters__header_subtitle">Modifier vos paramètres</h2>
                </div>
                <div className="container parameters__content">
                    <ParametersForm {...this.props} />
                        <hr />
                    <ParametersPassword/>
                </div>
            </div>
        );
    }
}


export default Parameters