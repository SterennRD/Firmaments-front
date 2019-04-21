import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Modal from "../forms/renderModal";

class ChapterList extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, idModal:null}
    }

    handleDelete(id) {
        const confirm = window.confirm("Voulez-vous vraiment supprimer l'histoire ?")
        console.log("je supprime");
        this.setState({showModal: false, idModal: null})
    }

    handleDeleteConfirm(id) {
        this.setState({showModal: true, idModal: id})
    }
    handleCancel() {
        this.setState({showModal: false, idModal: null})
    }
    render() {
        let {story} = '';
        if (!this.props.story || this.props.story === undefined) {
            story = this.props.stories.selectedStory.story
        } else {
            story = this.props.story;
        }

        const modal = (
            <Modal
                title="Confirmer ?"
                id={this.state.idModal}
                explanation="Votre chapitre sera supprimé"
                yesButton="Oui, supprimer ce chapitre"
                noButton="Non, je veux garder ce chapitre"
                yesCallback={id => {
                    this.handleDelete(id);
                }}
                noCallback={() => {
                    this.handleCancel();
                }}
            />
        );

        const chapters  = this.props.chapters.map(chapter => (
            <div key={chapter._id}>
                {chapter.title} {chapter._id}
                <button id={chapter._id} onClick={(e) => this.handleDeleteConfirm(e.target.id)}>Supprimer</button>
                <Link to={this.props.match.url + '/' + story._id + '/chapter/' + chapter._id + '/edit'} >Editer</Link>
            </div>
            )
        );
        return (
            <div>
                <h2>Liste des chapitres</h2>
                {this.state.showModal ? modal : null}
                {chapters}
            </div>
        );
    }
}

export default ChapterList;