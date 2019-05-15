import React, {Component, PropTypes} from 'react';
import {Link, Route} from "react-router-dom";
import io from 'socket.io-client';
import Modal from '../forms/renderModal';
import moment from "moment/min/moment-with-locales.min";

class StoryList extends Component {
    constructor(props) {
        super(props);
        this.state = { stories: [], showModal: false, idModal: null}
        //this.socket = io.connect('localhost:4001');
    }
    componentDidMount() {
        console.log("mes histoires monté")
        const {user} = this.props.auth;
        if (user) {
        console.log("je cherche mes histoires")
            this.props.getStory(user._id)
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.auth.user !== this.props.auth.user) {

            const {user} = this.props.auth;
            if (user) {
                this.props.getStory(user._id)
            }
        }
    }

    handleDelete(id) {
        this.props.deleteStory(id);
        this.setState({showModal: false, idModal: null})
    }

    handleDeleteConfirm(id) {
        this.setState({showModal: true, idModal: id})
    }
    handleCancel() {
        this.setState({showModal: false, idModal: null})
    }

    render() {
        moment.locale('fr');
        const {isAuthenticated, user} = this.props.auth;
        const {stories, loading, error} = this.props.stories.stories;

        if (loading) {
            return <div className="container">Loading...</div>;
        } else if(error) {
            return  <div className="alert alert-danger">{error.message}</div>
        } else if(!stories) {
            return <span />
        } else if(!user) {
            return <div className="alert alert-danger">Connectez-vous pour accéder à vos histoires</div>
        }

        let storiesList = ''
        if (stories.length > 0) {
            storiesList = stories.map( s => (
                <div className="myStories__item" key={s._id}>
                    <div className="myStories__item_stats">
                        <div>{s.nb_likes} <i className="fas fa-heart"></i></div>
                        <div>{s.nb_favorites} <i className="fas fa-star"></i></div>
                        <div>{s.nb_comments} <i className="fas fa-comment"></i></div>
                    </div>
                    <div className="myStories__item_title">
                        <Link className="myStories__item_link" to={this.props.match.url + '/see/' + s._id}>{s.title}</Link>
                        <span className="myStories__item_badge badge badge-primary">{s.rating ? s.rating.label : null}</span>
                    </div>
                    <div className="myStories__item_date">Mis à jour le {moment(s.updated_at).format('LLL')}</div>
                    <div className="myStories__item_chapters">{ s.chapters.length } chapitre{ s.chapters.length > 1 ? 's' : ''}</div>
                    <Link to={this.props.match.url + '/toc/' + s._id}>TOC</Link>
                    <div className="myStories__item_buttons">
                        <button className="myStories__item_buttons_btn myStories__item_buttons_btn--border" id={s._id} onClick={(e) => this.handleDeleteConfirm(e.target.id)}><i className="fas fa-trash"></i> Supprimer</button>
                        <button className="myStories__item_buttons_btn" id={s._id} onClick={(e) => this.handleDeleteConfirm(e.target.id)}><i className="fas fa-pencil-alt"></i> Supprimer</button>
                    </div>
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
            <div className="myStories">
                <div className="myStories__header">
                    <h1 className="myStories__header_title"><i className="th th-shooting-star"></i> Les histoires</h1>
                    <Link to={this.props.match.url + '/new'} className="btn btn-primary">Créer une histoire</Link>
                </div>
                <div className="container">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </div>
        );
    }
}

export default StoryList;