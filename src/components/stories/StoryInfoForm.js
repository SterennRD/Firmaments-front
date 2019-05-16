import React, { Component, PropTypes } from 'react';
import {reduxForm, Field, SubmissionError, change as changeFieldValue, formValueSelector, arrayPush } from 'redux-form';
import { connect } from 'react-redux'
import {Link} from "react-router-dom";
import Select from 'react-select'


import renderField from '../forms/renderField';
import renderTextArea from '../forms/renderTextArea';
import renderSelect from '../forms/renderSelect';
import validate from './validate'
import {status, rating, category} from "./constants";

import {editStory, resetForm} from "../../actions/StoryAction";
import renderFile from "../forms/renderFile";

//For any field errors upon submission (i.e. not instant check)
const validateAndCreatePost = (values, dispatch)  => {
    const arrCat = [];
    for (let i = 0; i < values.category.length; ++i) {
        values.category[i].value ? arrCat.push(parseInt(values.category[i].value)) : arrCat.push(parseInt(values.category[i].id))
    }
    const selectedCategory = category.filter( el => arrCat.includes(el.id));
    console.log("catégories sélectionnées", selectedCategory)
    const selectedRating = values.rating.id ? values.rating : rating.find( el => el.id === parseInt(values.rating));
    const selectedStatus = values.status.id ? values.status : status.find( el => el.id === parseInt(values.status));
    const newValues = {...values, category: selectedCategory, rating: selectedRating, status: selectedStatus};

    // Delete useless values
    delete newValues.chapters;
    delete newValues.author;
    delete newValues.last_comments;
    delete newValues.nb_likes;
    delete newValues.nb_comments;
    delete newValues.nb_favorites;
    delete newValues.likes;

    console.log("ENVOI ENVOI ENVOI")
    console.log(values)
    console.log('les valeurs envoyées')
    console.log(newValues)
    return dispatch(editStory(newValues, localStorage.getItem('jwtToken')));
};
let resetFields = {
    title: '',
    description: '',
    status: '',
    rating: '',
    comment_authorized: true,
    annotation_authorized: true,
}



class StoryInfoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: []
        }
    }
    handleChange = items => {
        let newSelection = [...this.state.selectedItems]
        if (!this.state.selectedItems.includes(items.target.value) && this.state.selectedItems.length < 3) {
            newSelection = [...this.state.selectedItems, items.target.value]
            //arrayPush("StoryForm", "category", items.target.value)
        }
        console.log("SELECTED")
        console.log(this.state.selectedItems)
        this.setState({selectedItems : newSelection})
        //
        changeFieldValue("StoryForm", "category", this.state.selectedItems);
    }

    handleDeselect = item => {
        let newSelection = this.state.selectedItems.filter(el => el !== item)
        console.log(item)
        console.log("new selection")
        console.log(newSelection)
        this.setState({selectedItems : newSelection})
    }

    componentWillUnmount() {
        //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
        //always reset that global state back to null when you REMOUNT
        this.props.resetMe();
        //this.props.createMode();
        const {mode} = this.props;
        if (mode === 'edit') {
            this.props.destroy();
        }
    }
    componentDidMount() {
        console.log("le formulaire s'est monté")
        this.props.resetMe();

        /*for (var key in values) {
            console.log(key, values)
            if (values.hasOwnProperty(key)) {
                change(key,values[key]);
            }
        }*/

        const url =this.props.history.location.pathname;
        const id = url.split('/').pop();

        const {mode} = this.props;
        if (mode === 'edit') {
            this.props.getStoryById(id);
            //this.props.editMode();
        }
    }
    componentWillMount() {
        //this.props.resetMe()
    }

    componentWillReceiveProps(nextProps) {
        console.log("le formulaire reçoit des props")
        console.log(nextProps)

        /*const { change, initialValues } = this.props
        const values = nextProps.initialValues;

        if(initialValues !== values){
            for (var key in values) {
                if (values.hasOwnProperty(key)) {
                    change(key,values[key]);
                }
            }
        }*/
    }

    renderError(newPost) {
        if (newPost && newPost.error && newPost.error.message) {
            return (
                <div className="alert alert-danger">
                    { newPost ? newPost.error.message : '' }
                </div>
            );
        } else {
            return null
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
            return null
        }
    }

    renderSuccess(editStory) {
        if (editStory.success) {
            return (
                <div className="alert alert-success">
                    Histoire éditée !
                </div>
            );
        }
    }

    render() {
        const {handleSubmit, submitting, newPost, mode} = this.props;
        const {editMode, editStory} = this.props.stories;

        console.log("story info form");
        console.log(this.props.initialValues);
        console.log(this.props);

        const arrCat = [];
        for (let i = 0; i < this.state.selectedItems.length; ++i) {
            arrCat.push(parseInt(this.state.selectedItems[i]))
        }
        const selectedCategory = category.filter( el => arrCat.includes(el.id));
        const selectedDisplay = selectedCategory.map(item => <div key={item.id} id={item.id} onClick={(e) => this.handleDeselect(e.target.id)}>{item.label}</div>);

        let edit = (
            <div>
                <h2 className="storyForm__header_title">Editer une histoire</h2>
                <div className="storyForm__header_tabs">
                    <h3 className="storyForm__header_subtitle storyForm__header_subtitle--active">Informations de l'histoire</h3>
                    <h3 className="storyForm__header_subtitle">Table des matières</h3>
                </div>
            </div>
        );
        let create = (
            <div>
                <h2 className="storyForm__header_title">Créer une histoire</h2>
                <div className="storyForm__header_tabs">
                    <h3 className="storyForm__header_subtitle storyForm__header_subtitle--active">Informations de l'histoire</h3>
                </div>
            </div>
        );
        if (this.props.initialValues) {
            edit = (
                <div>
                    <h2 className="storyForm__header_title">Editer une histoire</h2>
                    <div className="storyForm__header_tabs">
                        <h3 className="storyForm__header_subtitle storyForm__header_subtitle--active">Informations de l'histoire</h3>
                        <Link to={this.props.match.url + '/toc/' + this.props.initialValues._id}>
                            <h3 className="storyForm__header_subtitle">Table des matières</h3>
                        </Link>
                    </div>
                </div>
            )
        }

        if (editStory.loading) {
            return <div>Chargement... </div>
        }
        console.log("this.props.form.values.description.trim()")
        console.log(this.props.form)

        const maxLength = max => value =>
            value && value.length > max ? `Must be ${max} characters or less` : undefined
        const maxLength350 = maxLength(350)

        return (
            <div>
                <div className="storyForm__header">

                    <div className="storyForm__header_back" onClick={this.props.history.goBack}><i className="fas fa-arrow-left"></i></div>
                    { mode === 'edit' ? edit : 'Create' }
                </div>
                <form
                    className="container storyForm__form"
                    onSubmit={ mode === 'edit' ? handleSubmit(validateAndCreatePost) : handleSubmit }
                    encType="multipart/form-data">
                    <div className="row">
                        <div className="col-md-4">
                            {this.props.initialValues && this.props.initialValues.cover ? (
                                <div className="storyForm__cover"><img src={process.env.REACT_APP_UPLOADS + '/' + this.props.initialValues.cover} alt={this.props.initialValues.title}/></div>
                            ) : (
                                <div>Ajoutez une couverture</div>
                            )}
                            <Field
                                name="cover"
                                type="file"
                                component={ renderFile }
                                dataAllowedFileExtensions="jpg png bmp"
                                label="Couverture" />
                        </div>
                        <div className="col-md-8">
                            { this.renderError(newPost) }
                            { this.renderEdit(editStory) }
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
                                validate={[ maxLength350 ]}
                                showMax={350}
                            />
                            <div className="storyForm__form_multi-select">
                            <Field
                                name="category"
                                component={ renderSelect }
                                label="Catégorie *"
                                type="select-multiple"
                                options={category}
                                multiple={true}
                            />
                            </div>
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
                            <div className="storyForm__form_checkboxes">
                                <div className="storyForm__form_check-item">
                                    <label htmlFor="comment_authorized">Autoriser les commentaires</label>
                                    <Field name="comment_authorized" id="comment_authorized" component="input" type="checkbox"/>
                                </div>
                                <div className="storyForm__form_check-item">
                                    <label htmlFor="annotation_authorized">Autoriser les annotations</label>
                                    <Field name="annotation_authorized" id="annotation_authorized" component="input" type="checkbox"/>
                                </div>
                            </div>

                            {mode === 'edit' ? (
                                <div className="storyForm__buttons">
                                    <button type="submit" className="storyForm__buttons_btn">
                                        Modifier
                                    </button>
                                </div>
                            ) : (
                                <div className="storyForm__buttons">
                                    <button type="submit" className="storyForm__buttons_btn next">
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}


// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
StoryInfoForm = reduxForm({
    form: 'StoryForm',  // a unique identifier for this form
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true,
    validate
})(StoryInfoForm);

// You have to connect() to any reducers that you wish to connect to yourself
const selector = formValueSelector('StoryForm')
StoryInfoForm = connect(
    state => ({
        //initialValues: state.stories.selectedStory.story // pull initial values from account reducer
    })
)(StoryInfoForm);

export default StoryInfoForm