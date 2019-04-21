import React, { Component, PropTypes } from 'react';
import {Link, Route} from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from '../forms/renderField';
import renderTextArea from '../forms/renderTextArea';
import renderSelect from '../forms/renderSelect';
import { createStory } from '../../actions/StoryAction';
import ChapterForm from "./ChapterForm";


const rating = [
    {id: 1, label: 'Tout public'},
    {id: 2, label: 'Public averti'},
    {id: 3, label: 'Mature'},
    ];
const status = [
    {id: 1, label: 'En cours'},
    {id: 2, label: 'Terminé'},
    {id: 3, label: 'Brouillon'}
];

//Client side validation
function validate(values) {
    const errors = {};

    if (!values.title || values.title.trim() === '') {
        errors.title = 'Entrez un titre';
    }
    if (!values.description || values.description.trim() === '') {
        errors.description = 'Entrez une description';
    }
    return errors;
}
//For any field errors upon submission (i.e. not instant check)
const validateAndCreatePost = (values, dispatch)  => {
    const selectedRating = rating.find( el => el.id === parseInt(values.rating));
    const selectedStatus = status.find( el => el.id === parseInt(values.status));
    const newValues = {... values, rating: selectedRating, status: selectedStatus}
    //return dispatch(createStory(newValues, localStorage.getItem('jwtToken')))
}


class StoryForm extends Component {

    componentWillMount() {
        //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
        //always reset that global state back to null when you REMOUNT
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newStory.story && !nextProps.newStory.error) {
            this.props.resetMe();
            this.props.history.push('/new/chapter');
        }
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
    render() {
        const {handleSubmit, submitting, newPost} = this.props;
        console.log("le formulaire")
        console.log(this.props)
        return (
            <div className='container'>
                { this.renderError(newPost) }
                <form onSubmit={ handleSubmit(validateAndCreatePost) }>
                    <Field
                        name="title"
                        type="text"
                        component={ renderField }
                        label="Titre *" />
                    <Field
                        name="description"
                        component={ renderTextArea }
                        label="Description *"
                        placeholder="Description de l'histoire"
                    />
                    <Field
                        name="rating"
                        component={ renderSelect }
                        label="Rating *"
                        type="select"
                        options={rating}
                    />
                    <Field
                        name="status"
                        component={ renderSelect }
                        label="Statut *"
                        type="select"
                        options={status}
                    />
                    <div className="form-check">
                        <label htmlFor="comment_authorized">Autoriser les commentaires</label>
                        <Field name="comment_authorized" id="comment_authorized" component="input" type="checkbox"/>
                    </div>
                    <div className="form-check">
                        <label htmlFor="annotation_authorized">Autoriser les annotations</label>
                        <Field name="annotation_authorized" id="annotation_authorized" component="input" type="checkbox"/>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={ submitting }>
                            Submit
                        </button>
                        <Link
                            to="/"
                            className="btn btn-error"> Cancel
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}


export default reduxForm({
    form: 'PostsForm', // a unique identifier for this form
    validate
})(StoryForm)