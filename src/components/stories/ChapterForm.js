import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from '../forms/renderField';
import renderTextArea from '../forms/renderTextArea';
import renderSelect from '../forms/renderSelect';
import validate from './validate'
import { createStory, getStoryById, editChapter, createChapter } from '../../actions/StoryAction';
import {status, rating, category} from "./constants";
import connect from "react-redux/es/connect/connect";


import { createEditorStateWithText } from 'draft-js-plugins-editor';



import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";

import renderWysiwyg from "../forms/RenderWysiwyg";
// load theme styles with webpack
require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');




//For any field errors upon submission (i.e. not instant check)
const validateAndCreatePost = (values, dispatch)  => {
    const selectedCategory = category.find( el => el.id === parseInt(values.category));
    const selectedRating = rating.find( el => el.id === parseInt(values.rating));
    const selectedStatus = status.find( el => el.id === parseInt(values.status));
    const newValues = {
        ...values,
        rating: selectedRating,
        status: selectedStatus,
        category: selectedCategory,
        chapters: [
            {
                title: values.titleChapter,
                content: values.content
            }
        ]
    }
    delete newValues.titleChapter;
    delete newValues.content;
    console.log(newValues)
    return dispatch(createStory(newValues, localStorage.getItem('jwtToken')))
}

const validateAndAddChapter = (values, dispatch, state)  => {
    console.log("je crée un chapitre")
    console.log(values)
    const id = state.stories.selectedStory.story._id;
    const newValues = {
        ...values,
        title: values.titleChapter,
        status: {id: 1, label: 'Brouillon'}
    };
    delete newValues.titleChapter;
    console.log(newValues)
    return dispatch(createChapter(newValues, id, localStorage.getItem('jwtToken') ))
}

const validateAndEditChapter = (values, dispatch, state)  => {
    console.log("j'édite un chapitre")
    console.log(values)
    const newValues = {
        ...values,
        title: values.titleChapter
    }
    delete newValues.titleChapter;
    console.log(newValues)

    return dispatch(editChapter(newValues, state.chapter.story._id, localStorage.getItem('jwtToken')))
}
const handleMode = (mode) => {
    if (mode === 'create') {
        console.log("je suis en mode création de chapitre")
    } else if (mode === 'edit') {
        return
    } else if (mode === 'createStory') {
        //validateAndCreatePost()
    }
}

class ChapterForm extends Component {
    constructor(props) {
        super(props);
        this.state= { text: '', editorState: ''}
    }

    componentWillUnmount() {
        this.props.resetMe();
        const {mode} = this.props;
        if (mode === 'edit') {
            this.props.destroy();
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps")
        console.log(nextProps)
        if (nextProps.stories.newStory.story && !nextProps.stories.newStory.error) {
            this.props.history.push('/stories/toc/' + nextProps.stories.newStory.story._id);
        }
    }

    componentDidMount() {
        const { mode } = this.props;
        let idChapter = this.props.chapterID;
        let id = this.props.storyID;
        if (this.props.chapterID == undefined || !this.props.chapterID) {
            idChapter = this.props.location.pathname.split('/')[4];
        }
        if (this.props.storyID == undefined || !this.props.storyID) {
            id = this.props.location.pathname.split('/')[2];
        }

        if (mode === 'create' && !this.props.stories.selectedStory.story) {
            console.log("recherche de l'histoire")
            this.props.getStoryById(id)
        }


        if (mode === 'edit') {
            console.log("recherche du chapitre")
            this.props.getChapterById(id, idChapter)
        }
    }

    renderEdit(editChapter) {
        if (editChapter && editChapter.error && editChapter.error.message) {
            return (
                <div className="alert alert-danger">
                    { editChapter ? editChapter.error.message : '' }
                </div>
            );
        } else if (editChapter.chapter) {
            let id = this.props.storyID;
            if (this.props.storyID === undefined || !this.props.storyID) {
                id = this.props.location.pathname.split('/')[2];
            }
            let url = "/stories/toc/" + id;
            return (
                <div className="alert alert-success">
                    Chapitre édité !
                    <div><Link to={url} className="btn btn-primary">Retour à la table des matières</Link></div>
                </div>
            );
        } else {
            return <span></span>
        }
    }
    renderNew(newChapter) {
        if (newChapter && newChapter.error && newChapter.error.message) {
            return (
                <div className="alert alert-danger">
                    { newChapter ? newChapter.error.message : '' }
                </div>
            );
        } else {
            return <span></span>
        }
    }
    handleChange(text, medium) {
        this.setState({text: text});
    }

    state = {
        editorState: createEditorStateWithText("coucou"),
    };
    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    focus = () => {
        this.editor.focus();
    };

    onEditorStateChange = (editorState) => {
        console.log("change edit")
        console.log(editorState)

        this.setState({
            editorState,
        });
        console.log(this.props)
    };
    changeValue(editorState) {
        const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        console.log(value)
        this.props.input.onChange(value);
    }

    render() {
        const {handleSubmit, submitting, pristine, previousPage, mode } = this.props;
        const { story } = this.props.stories.selectedStory;
        const { editChapter, newChapter } = this.props.chapter;
        console.log("chapter")
        console.log(this.props)
        //console.log(this.props.match.params)

        let title = '';
        let buttons = '';
        let submit = '';


        if (mode === 'create') {
            title = (
                <div>
                <div><button onClick={this.props.history.goBack}>Go Back</button></div>
                <h1>Créer un chapitre</h1>
                </div>
            );
            buttons = (
                <div>
                    <button type="submit" disabled={pristine || submitting}>
                        Créer
                    </button>
                </div>
            );
            const { loading, error, chapter } = this.props.chapter.newChapter;
            if (chapter) {
                let id = this.props.storyID;
                if (this.props.storyID === undefined || !this.props.storyID) {
                    id = this.props.location.pathname.split('/')[2];
                }
                let url = "/stories/toc/" + id;
                return (
                    <div className="alert alert-success">
                        Chapitre créé avec succès !
                        <div><Link to={url}>Retour</Link></div>
                    </div>
                );
            }
            submit = handleSubmit(validateAndAddChapter)
        } else if (mode === 'edit') {
            const { loading, error } = this.props.chapter;
            title = <h1>Editer un chapitre</h1>;
            buttons = (
                <div>
                    <button type="submit" disabled={pristine || submitting}>
                        Editer
                    </button>
                </div>
            );
            submit = handleSubmit(validateAndEditChapter)
            if (loading) {
                return <div>Loading...</div>
            } else if (error) {
                return <div>{error}</div>
            }
        } else if (mode === 'createStory') {
            title = <h1>Ajouter un chapitre</h1>;
            buttons = (
                <div>
                    <button type="button" className="previous" onClick={previousPage}>
                        Previous
                    </button>
                    <button type="submit" disabled={pristine || submitting}>
                        Submit
                    </button>
                </div>
            );
            submit = handleSubmit(validateAndCreatePost)
        }





        return (
            <div className='container'>
                { this.renderEdit(editChapter) }
                { this.renderNew(newChapter) }
                {title}
                <form onSubmit={submit}>
                    <Field
                        name="titleChapter"
                        type="text"
                        component={ renderField }
                        label="Titre *" />
                    {/*<Field
                        name="content"
                        component={ renderTextArea }
                        label="Contenu *"
                        placeholder="Contenu de l'histoire"
                    />*/}
                    {/*<Field
                        name="content"
                        component={ renderWysiwyg }
                        onChange={this.handleChange.bind(this)}
                        label="Contenu *"
                        placeholder="Contenu de l'histoire"
                    />*/}
                    {/*<Field
                        name="content"
                        component={ WysiwygEditor }
                        label="Contenu *"
                        placeholder="Contenu de l'histoire"
                    />*/}
                    <Field
                        name="content"
                        component={ renderWysiwyg }
                        label="Contenu *"
                        placeholder="Contenu de l'histoire"
                    />

                    {/*<Editor
                        text={this.state.text}
                        onChange={this.handleChange.bind(this)}
                    />*/}

                    {buttons}

                </form>
            </div>
        )
    }
}


/*export default reduxForm({
    form: 'StoryForm', // a unique identifier for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
})(ChapterForm)*/

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ChapterForm = reduxForm({
    form: 'StoryForm',  // a unique identifier for this form
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true,
    validate
})(ChapterForm);

// You have to connect() to any reducers that you wish to connect to yourself
ChapterForm = connect(
    state => ({
        //initialValues: state.chapter.selectedChapter
    })
)(ChapterForm);

export default ChapterForm