import React, {Component, PropTypes} from 'react';
import {Link, Route} from "react-router-dom";
import io from 'socket.io-client';
import Modal from '../forms/renderModal';

class StoryList extends Component {
    constructor(props) {
        super(props);
        this.state = { stories: [], showModal: false, idModal: null}
        //this.socket = io.connect('localhost:4001');
    }
    componentDidMount() {
        const {user} = this.props.auth;
        if (user) {
            this.props.getStory(user._id)
        }
    }
    componentWillMount(nextProps) {
        console.log(nextProps)
        const {user} = this.props.auth;
        if (user) {
            this.props.getStory(user._id)
        }
    }

    handleDelete(id) {
        const confirm = window.confirm("Voulez-vous vraiment supprimer l'histoire ?")
        console.log("je supprime");
        if (confirm) {

        this.props.deleteStory(id);
        this.setState({showModal: false, idModal: null})
        }
    }

    handleDeleteConfirm(id) {
        this.setState({showModal: true, idModal: id})
    }
    handleCancel() {
        this.setState({showModal: false, idModal: null})
    }

    render() {

        const {isAuthenticated} = this.props.auth;
        const {user} = this.props.auth.user;
        const {stories, loading, error} = this.props.stories.stories;

        if (loading) {
            return <div className="container">Loading...</div>;
        } else if(error) {
            return  <div className="alert alert-danger">{error.message}</div>
        } else if(!stories) {
            return <span />
        }

        let storiesList = ''
        if (stories.length > 0) {
            storiesList = stories.map( s => (
                <div className="story" key={s._id}>
                    <Link to={this.props.match.url + '/see/' + s._id}>{s.title} <span
                        className="badge badge-primary">{s.rating ? s.rating.label : null}</span></Link>
                    <button id={s._id} onClick={(e) => this.handleDeleteConfirm(e.target.id)}>Supprimer</button>
                    <div>{ s.description }</div>
                    <div>{ s.chapters.length } chapitre{ s.chapters.length > 1 ? 's' : ''}</div>
                    <Link to={this.props.match.url + '/toc/' + s._id}>TOC</Link>
                </div>
            ))
        } else {
            storiesList = <div>Vous n'avez pas d'histoire</div>
        }

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

        const authLinks = (
            <div>
            <div>Coucou</div>
                {this.state.showModal ? modal : null}
                {storiesList}
            </div>
        );
        const guestLinks = (
            <div>Connectez-vous</div>
        );

        return (
            <div>
                Les histoires
                <Link to={this.props.match.url + '/new'} className="btn btn-primary">Créer une histoire</Link>

                <div>{isAuthenticated ? authLinks : guestLinks}</div>
            </div>
        );
    }
}

export default StoryList;