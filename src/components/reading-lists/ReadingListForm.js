import React, {Component} from 'react';
import {reduxForm, Field, SubmissionError, change as changeFieldValue, formValueSelector, arrayPush } from 'redux-form';
import { connect } from 'react-redux'
import {Link} from "react-router-dom";

import renderField from '../forms/renderField';
import renderTextArea from '../forms/renderTextArea';
import renderFile from "../forms/renderFile";
import renderSelect from "../forms/renderSelect";
import {category, rating, status} from "../stories/constants";
import {editStory} from "../../actions/StoryAction";
import validate from './validate'

const validateAndCreatePost = (values, dispatch)  => {
    console.log(values)
};

class ReadingListForm extends Component {
    fetchData(id) {
        this.props.getReadingList(id)
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        this.fetchData(id)
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
    renderEdit(editStory) {
        if (editStory && editStory.error && editStory.error.message) {
            return (
                <div className="alert alert-danger">
                    { editStory ? editStory.error.message : '' }
                </div>
            );
        } else if (editStory && editStory.success) {
            return (
                <div className="alert alert-success">
                    Histoire éditée !
                </div>
            );
        } else {
            return <span></span>
        }
    }

    render() {
        const {handleSubmit, submitting, mode} = this.props;
        const { selectedReadingList, editReadingList } = this.props.user;

        const maxLength = max => value =>
            value && value.length > max ? `Must be ${max} characters or less` : undefined
        const maxLength350 = maxLength(350)

        return (
            <div>
                { this.renderError(editReadingList) }
                { this.renderEdit(editReadingList) }
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