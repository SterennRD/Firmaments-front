import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import renderTextArea from '../forms/renderTextArea';
import connect from "react-redux/es/connect/connect";
import {addComment} from "../../actions/StoryAction";


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.handleAuthentication = this.handleAuthentication.bind(this)
    }

    validateAndAddComment(values, dispatch, state) {
        if (state.auth.user._id) {

        }

        const newValues = {
            ...values,
            author: state.auth.user._id,
        };

        const id = state.chapter.selectedChapter._id;
        const token = localStorage.getItem('jwtToken');
        const socket = state.auth.socket;

        return dispatch(addComment(newValues, id, token, socket))
    }
    componentDidUpdate(prevProps) {
        if (this.props.chapter.newComment.comment) {
            this.props.destroy();
            this.props.resetMe()
        }
    }
    handleAuthentication() {
        console.log("is user connected?")
        if (this.props.auth.user._id) {

        }
    }
    render() {
        if (this.props.auth.socket) {
            console.log(this.props.auth.socket)
            this.props.auth.socket.on("essai", (msg) => console.info("je reçois la notif", msg));
        }
        const {handleSubmit, submitting, pristine, previousPage, mode } = this.props;
        console.log("comments", this.props)
        return (
            <div>
                <h2>Laisser un commentaire</h2>
                <form onSubmit={handleSubmit(this.validateAndAddComment)}>
                    <Field
                        name="content"
                        component={ renderTextArea }
                        label="Contenu *"
                        placeholder="Contenu du commentaire"
                        onFocus={this.handleAuthentication}
                    />
                    <div>
                        <button type="submit" disabled={pristine || submitting}>
                            Créer
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

CommentForm = reduxForm({
    form: 'CommentForm',
    forceUnregisterOnUnmount: true,
    enableReinitialize: true
})(CommentForm);

CommentForm = connect(
    state => ({
        chapter: state.chapter
    })
)(CommentForm);

export default CommentForm