import React, {Component} from 'react';
import {reduxForm, Field, SubmissionError, change as changeFieldValue, formValueSelector, arrayPush } from 'redux-form';
import { connect } from 'react-redux'
import {Link} from "react-router-dom";

import renderField from '../forms/renderField';
import renderTextArea from '../forms/renderTextArea';
import renderFile from "../forms/renderFile";
import renderSelect from "../forms/renderSelect";
import {category, rating, status} from "../stories/constants";
import {editReadingList} from "../../actions/UserActions";
import validate from './validate'
import {editStory} from "../../actions/StoryAction";
import Modal from "../forms/renderModal";

const validateAndCreatePost = (values, dispatch)  => {
    console.log(values)
    const token = localStorage.getItem('jwtToken');
    return dispatch(editReadingList(values, token))
};

class ReadingListForm extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, idModal: null}
        this.handleDelete = this.handleDelete.bind(this)
        this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this)
    }

    fetchData(id) {
        this.props.getReadingList(id)
    }
    componentWillUnmount() {
        console.log('DESTRUCTION DU STATE')
        this.props.resetMe()
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        this.fetchData(id)
    }
    handleDelete(id) {
        console.log("supprimer rl", id)
        const token = localStorage.getItem('jwtToken');
        this.props.deleteReadingList(id, token)
        this.setState({showModal: false, idModal: null})
    }
    handleDeleteConfirm() {
        console.log("suppr")
        let id = this.props.match.params.id;
        this.setState({showModal: true, idModal: id})
    }
    handleCancel() {
        this.setState({showModal: false, idModal: null})
    }
    renderError(newPost) {
        if (newPost && newPost.error && newPost.error.message) {
            return (
                <div className="alert alert-danger">
                    { newPost ? newPost.error.message : '' }
                </div>
            );
        } else {
            return <span></span>
        }
    }
    renderEdit(editReadingList) {
        if (editReadingList && editReadingList.error && editReadingList.error.message) {
            return (
                <div className="alert alert-danger">
                    { editReadingList ? editReadingList.error.message : '' }
                </div>
            );
        } else if (editReadingList.readingList) {
            let url = this.props.match.url;
            url = url.split('/');
            url = url.splice(0,url.length-1).join('/')
            return (
                <div className="alert alert-success">
                    Liste de lecture éditée !
                    <div><Link to={url} className="btn btn-primary">Retour à la liste de lecture</Link></div>
                </div>
            );
        } else {
            return <span></span>
        }
    }

    render() {
        const {handleSubmit, submitting, mode} = this.props;
        const { selectedReadingList, editReadingList, deletedReadingList } = this.props.user;

        const maxLength = max => value =>
            value && value.length > max ? `Must be ${max} characters or less` : undefined
        const maxLength350 = maxLength(350)

        const modal = (
            <Modal
                title="Confirmer ?"
                id={this.state.idModal}
                explanation="Votre histoire sera supprimée"
                yesButton="Oui, supprimer mon histoire"
                noButton="Non, je veux garder mon histoire"
                yesCallback={id => {
                    this.handleDelete(id);
                }}
                noCallback={() => {
                    this.handleCancel();
                }}
            />
        );

        if (deletedReadingList.readingList) {
            const url = this.props.auth.user._id;
            return (
                <div>
                    Liste supprimée !
                    <Link to={"/user/profile/" + url}>Retour</Link>
                </div>
            )
        }

        return (
            <div>
                { this.renderEdit(editReadingList) }
                {this.state.showModal ? modal : null}
                <h1>Editer</h1>
                <form onSubmit={handleSubmit(validateAndCreatePost)} encType="multipart/form-data">
                    <Field
                        name="title"
                        type="text"
                        component={ renderField }
                        label="Titre *" />
                    <Field
                        name="description"
                        component={ renderTextArea }
                        label="Description"
                        placeholder="Description de la liste de lecture"
                        validate={[ maxLength350 ]}
                        showMax={350}
                    />
                    <div className="form-check">
                        <label htmlFor="private">Liste privée</label>
                        <Field name="private" id="private" component="input" type="checkbox"/>
                    </div>
                    <div>
                        <button type="submit">
                            Modifier
                        </button>

                    </div>
                </form>
                <button onClick={this.handleDeleteConfirm}>
                    Supprimer
                </button>
            </div>
        );
    }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ReadingListForm = reduxForm({
    form: 'ReadingListForm',  // a unique identifier for this form
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true,
    validate
})(ReadingListForm);

// You have to connect() to any reducers that you wish to connect to yourself

ReadingListForm = connect(
    state => ({
        initialValues: state.user.selectedReadingList.readingList // pull initial values from account reducer
    })
)(ReadingListForm);


export default ReadingListForm;