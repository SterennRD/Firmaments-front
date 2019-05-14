import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import Like from "../../containers/LikeContainer";
import moment from "moment/min/moment-with-locales.min";
const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/images/uploads/' : '/images/uploads/';
class StoryDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            story: {}
        }

    }

    fetchData(id) {
        this.props.getStoryById(id)
    }

    componentWillUnmount() {
        //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
        //always reset that global state back to null when you REMOUNT
        this.props.resetMe();
    }

    componentDidMount() {
        console.log("Je lance le dispatch")
        const url =this.props.history.location.pathname;
        const id = url.split('/').pop();
        this.fetchData(id);
        if (this.props.auth.isAuthenticated) {

        }
    }

    handleLike(id) {
        console.log(id)
        let idUser = this.props.auth.user._id;
        let token = localStorage.getItem('jwtToken');
        if (!idUser || idUser == undefined) {
        } else {
            this.props.likeStory(id, idUser, token)
        }
    }

    render() {
        // INITIALISATION DE LA LOCALE POUR MOMENT JS
        moment.locale('fr');

        const {isAuthenticated, user, loadingUser } = this.props.auth;
        const { story, loading, error, like } = this.props.stories.selectedStory;

        let isMyStory = false;
        if (isAuthenticated && story && story.author._id === this.props.auth.user._id) {
            isMyStory = true;
        }

        console.log("détails")
        console.log(this.props)

        const url =this.props.history.location.pathname;
        const id = url.split('/').pop();
        const edit = (
            <Link to={this.props.match.url + '/edit/' + id}>Editer</Link>
        );


        if (loading) {
            return <div className="container">Loading...</div>;
        } else if(error) {
            return  <div className="alert alert-danger">{error.message}</div>
        } else if(!story) {
            return <span />
        }

        let status = ''
        if (story.status) {
            status = story.status.label
        }
        let categories = ''
        if (story.category) {
            categories = story.category.map( c => <span key={c.label}>{c.label}</span>)
        }



        if (like) {
            if (like.loading) {

            }
        }
        const chapters = story.chapters.map(c => <div key={c._id}><Link to={"/stories/" + story._id + "-" + c._id}>{c.title}</Link></div>)

        const result = isAuthenticated ? story.likes.find( e => e.user === user._id ) : null;
        console.log("result: " + result)
        let last_comments;
        if (story.last_comments.length > 0) {
            last_comments = story.last_comments.map( c => (
                <div key={c._id}>
                    Par <Link to={"/user/profile/" + c.author._id}>{c.author.username_display}</Link> sur <Link to={"/stories/" + story._id + "-" + c.chapter_id}>{c.title}</Link>
                    <div>{moment(c.created_at).format('LLL')}</div>
                    <p>{c.content}</p>
                </div>
            ))
        }
        const authorizations = (
                <div>
                    <div className={`alert alert-${story.annotation_authorized ? 'success' : 'danger'}`}>{story.annotation_authorized ? "Vous pouvez annoter l'histoire" : "Vous ne pouvez pas annoter l'histoire"}</div>
                    <div className={`alert alert-${story.comment_authorized ? 'success' : 'danger'}`}>{story.comment_authorized ? "Vous pouvez commenter l'histoire" : "Vous ne pouvez pas commenter l'histoire"}</div>
                </div>
        )
        return (
            <div>
                Les détails
                { story.cover ? <img src={process.env.REACT_APP_UPLOADS + '/' + story.cover} className="w-25"/> : <div>Pas d'image</div>}
                <div>{isAuthenticated && isMyStory ? edit : ''}</div>
                <button onClick={this.props.history.goBack}>Retour</button>
                <Like {...this.props}/>
                <a target="_blank" href={"https://twitter.com/intent/tweet?text=" + story.title + "&url=" + this.props.location.pathname +"&via=TheDesignCat"}>Tweet</a>
                <a target="_blank" href={"https://www.facebook.com/sharer/sharer.php?u="+ this.props.location.pathname}>Share on Facebook</a>
                <ul>
                    <li>{story._id}</li>
                    <li>Titre : {story.title}</li>
                    <li>Couverture</li>
                    <li>Auteur: {story.author.username}</li>
                    <li>Description: {story.description}</li>
                    <li>Catégories: {categories}</li>
                    <li>Statut: {status}</li>


                </ul>
                <div>{isAuthenticated ? authorizations : null}</div>
                <hr />
                <h2>Table des matières</h2>
                {chapters}
                <hr />
                <h2>Derniers commentaires</h2>
                {story.last_comments.length > 0 ? last_comments : "Aucun commentaire"}
            </div>
        );

    }
}

export default StoryDetails;