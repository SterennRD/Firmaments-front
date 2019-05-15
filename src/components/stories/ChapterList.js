import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Modal from "../forms/renderModal";
import {status, status_chapter} from "./constants";
import moment from "moment/min/moment-with-locales.min";
import {editChapter} from "../../actions/StoryAction";

class ChapterList extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, idModal:null, showPanel:[]}
        this.handleChangeStatus = this.handleChangeStatus.bind(this)
        this.showPanel = this.showPanel.bind(this)
    }
    showPanel(id) {
        this.setState((prevState) => {
            console.log("panel", prevState.showPanel)
            console.log(prevState.showPanel[id])

            if (prevState.showPanel[id]) {
                return {showPanel: []};
            } else {
                const newState = prevState.showPanel
                newState[id] = !newState[id];
                return {showPanel: newState};
            }


        });
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
        this.props.deleteChapter(id)
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
        let {chapter, loading, error} = this.props.chapter.deleteChapter;
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
            <div key={chapter._id} className="storyTable__chapter">
                <div className="storyTable__chapter_left">
                    <Link to={'/stories/'+ story._id + '-' + chapter._id } className="storyTable__chapter_title">{chapter.title}</Link>
                    {chapter.updated_at ? (
                        <div className="storyTable__chapter_date">Mis à jour le {moment(chapter.updated_at).format('LLL')}</div>
                    ):(
                        <div className="storyTable__chapter_date">Créé le {moment(chapter.created_at).format('LLL')}</div>
                    )}
                    {chapter.status ? <div className="storyTable__chapter_status">{chapter.status.label}</div> : null }
                </div>
                <div className="storyTable__chapter_right">
                    <div className="storyTable__chapter_stats">
                        <div>{chapter.comments.length} <i className="fas fa-comment"></i></div>
                        <div>{chapter.read.length} <i className="fas fa-eye"></i></div>
                        <div>{chapter.annotations.length} <i className="fas fa-pen"></i></div>
                    </div>
                    <div className="storyTable__chapter_buttons">
                        <div className="storyTable__chapter_panel_container">
                            <div id={chapter._id} onClick={e => this.showPanel(e.target.id)} className="storyTable__chapter_btn">+</div>
                            {this.state.showPanel[chapter._id] ?(
                            <div className="storyTable__chapter_panel">
                                <ul>
                                    <li id={chapter._id} onClick={(e) => this.handleDeleteConfirm(e.target.id)}>Supprimer</li>
                                    <li id={chapter._id} onClick={e => this.handleChangeStatus(e.target.id)}>{chapter.status.label === "Brouillon" ? "Publier le chapitre" : "Mode brouillon"}</li>
                                </ul>
                            </div>
                                ) : null }
                        </div>
                        <Link className="storyTable__chapter_btn" to={'/stories/'+ story._id +'/chapter/' + chapter._id + '/edit'} ><i className="fas fa-pencil-alt"></i> Editer</Link>
                    </div>
                </div>
                    {/*<button id={chapter._id} onClick={e => this.handleChangeStatus(e.target.id)}>{chapter.status.label === "Brouillon" ? "Publier le chapitre" : "Mode brouillon"}</button>*/}
            </div>
            )
        );
        moment.locale('fr');
        return (
            <div>
                {this.state.showModal ? modal : null}
                {loading ? "Chargement" : null}
                {chapter ? <div className="alert alert-success">Chapitre supprimé</div> : null}
                {error ? <div className="alert alert-danger">{error}</div> : null}
                {chapters}
            </div>
        );
    }
}

export default ChapterList;