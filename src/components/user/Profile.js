import React, {Component} from 'react';
import {Link} from "react-router-dom";

import FollowButton from "../../containers/FollowContainer";
import StoryCard from "../stories/StoryCard";
import StoryModal from "../stories/StoryModal";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            story: {}
        }
        this.handleModal = this.handleModal.bind(this)
    }
    fetchData(id) {
        this.props.getUserById(id)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchData(this.props.match.params.id);
        }
    }

    componentWillUnmount() {
        this.props.resetMe();
    }
    componentDidMount() {

        const id =this.props.match.params.id;
        this.fetchData(id);
    }

    handleModal(story) {
        console.log(story)
        this.setState({ showModal: true, story: story })
    }
    hideModal() {
        this.setState({ showModal: false, story: {} })
    }


    render() {
        console.log("profil")
        console.log(this.props)

        const { isAuthenticated } = this.props.auth;
        const currentUser = this.props.auth.user;
        const { user, loading, error } = this.props.user.selectedUser;
        let isMyProfile = false;

        if (user && currentUser) {
            if ( this.props.auth.user._id === user._id ) {
                isMyProfile = true;
            }
        }

        if (loading) {
            return <div className="container">Loading...</div>;
        } else if(error) {
            return  <div className="alert alert-danger">{error.message}</div>
        } else if(!user) {
            return <span />
        }
        const profileImage = <div className="rounded-circle"><i className="fas fa-user"></i></div>

        let stories;
        if (user.stories.length > 0) {
            stories = user.stories.map(story => (
                <div key={story._id} className="col-sm-4" onClick={e => this.handleModal(story)}>
                    <StoryCard
                        id={story._id}
                        title={story.title}
                        author={story.author}
                        description={story.description}
                        rating={story.rating.label}
                        categories={story.category}
                        nb_likes={story.nb_likes}
                        nb_favorites={story.nb_favorites}
                        nb_comments={story.nb_comments}
                        status={story.status.label}
                    />
                </div>
            ))
        } else {
            stories = <div>Pas d'histoires !</div>
        }

        const modal = <StoryModal
            hideModal={this.hideModal.bind(this)}
            story={this.state.story}
            auth={this.props.auth}
        />;

        let reading_lists = user.reading_lists;
        if (user.reading_lists) {
            let filtered_reading_lists = reading_lists.filter(e => {
                let result = false;
                if (e.private === false && !isMyProfile) {
                    result = true
                } else if (isMyProfile) {
                    result = true
                }
                return result
            })
            reading_lists = filtered_reading_lists.map(rl => (
                <div key={rl._id} className="border">
                    {/*<Link onClick={() => this.props.history.push('/reading-lists/' + rl._id)}>{rl.title}</Link>*/}
                    <Link to={"/user/reading-list/" + rl._id}>{rl.title}</Link>
                    {rl.private ? 'privée' : null}
                    <div>{rl.stories ? rl.stories.map(s => <div key={s._id}><Link to={"/stories/see/" + s._id}>{s.title}</Link> par {s.author.username_display}</div>) : null}</div>
                </div>
            ));

        } else {
            reading_lists = <div>Pas d'histoires !</div>
        }

        return (
            <div>
                { this.state.showModal ? modal : null }
                <h1>{user.username_display}</h1>
                <h2>@{user.username}</h2>
                {user.image ? 'image de profil' : profileImage}
                <div>{user.followers.length} followers</div>
                <div>{user.following.length} abonnement{user.following.length > 1 ? 's' : ''}</div>
                <div>{user.nb_stories} histoire{user.nb_stories > 1 ? 's' : ''}</div>
                { isMyProfile ? null : isAuthenticated ? <FollowButton {...this.props} /> : null }
                <hr />
                <h2>Histoires de {user.username_display}</h2>
                <div className="container">
                    <div className="row">
                        {stories}
                    </div>
                    {user.nb_stories > 6 ? <Link to={"/profile/" + user._id + "/stories"}>Voir plus</Link> : null}
                </div>
                <hr />
                <h2>Listes de lectures de {user.username_display}</h2>
                {user.reading_lists ? reading_lists.length : 0} listes de lecture
                <div className="container">{reading_lists}</div>
            </div>
        );
    }
}

export default Profile;