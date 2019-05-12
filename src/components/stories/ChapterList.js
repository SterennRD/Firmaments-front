import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Modal from "../forms/renderModal";
import {status, status_chapter} from "./constants";
import {editChapter} from "../../actions/StoryAction";

class ChapterList extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, idModal:null}
        this.handleChangeStatus = this.handleChangeStatus.bind(this)
    }
    componentWillUnmount() {
        this.props.resetMe()
    }
    handleChangeStatus(id) {
        let selectedChapter = this.props.stories.selectedStory.story.chapters.find( el => el._id === id);
        let newStatus;
        !selectedChapter.status ? newStatus = status_chapter.find( el => el.id === 2) : selectedChapter.status.id === 1 ? newStatus = status_chapter.find( el => el.id === 2) : newStatus = status_chapter.find( el => el.id === 1);
        selectedChapter = {...selectedChapter, status: newStatus};
        this.props.editChapter(selectedChapter, this.props.stories.selectedStory.story._id, localStorage.getItem('jwtToken'))
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

        const statusList = status_chapter.map(s => <option key={s.id} value={s.id}>{s.label}</option>)

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
            <div key={chapter._id} className="border mb-2">
                <Link to={'/stories/'+ story._id + '-' + chapter._id } >{chapter.title}</Link> {chapter._id}
                <div className="">
                    {chapter.comments.length} <i className="fas fa-comment"></i>
                    {chapter.read.length} <i className="fas fa-eye"></i>
                    {chapter.annotations.length} <i className="fas fa-pen"></i>
                </div>
                <button id={chapter._id} onClick={(e) => this.handleDeleteConfirm(e.target.id)}>Supprimer</button>
                <Link to={'/stories/'+ story._id +'/chapter/' + chapter._id + '/edit'} >Editer</Link>
                {chapter.status ? <div>{chapter.status.label}</div> : null }
                <button id={chapter._id} onClick={e => this.handleChangeStatus(e.target.id)}>{chapter.status.label === "Brouillon" ? "Publier le chapitre" : "Mode brouillon"}</button>
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