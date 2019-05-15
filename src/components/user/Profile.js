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
                        cover={story.cover}
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
        let nbRL;
        if (user.reading_lists) {
            let filtered_reading_lists = reading_lists.filter(e => {
                let result = false;
                if (e.private === false && !isMyProfile) {
                    result = true
                } else if (isMyProfile) {
                    result = true
                }
                return result
            });
            nbRL = filtered_reading_lists.length;
            reading_lists = filtered_reading_lists.slice(0,5).map(rl => (
                <div key={rl._id} className="profile__rl">
                    <Link className="profile__rl_title" to={"/user/reading-list/" + rl._id}>{rl.title}</Link>
                    <div className="profile__rl_stats">{rl.stories ? rl.stories.length : 0} histoire{rl.stories && rl.stories.length > 1 ? 's' : ''}</div>
                    {rl.private ? 'privée' : null}
                    <div className="profile__rl_stories">{rl.stories ? rl.stories.slice(0,6).map(s => <div className="profile__rl_story" key={s._id}><div className="profile__rl_story_cover">{s.cover ? <img src={process.env.REACT_APP_UPLOADS + '/' + s.cover} alt={s.title}/> : <i className="fas fa-book"></i>}</div><div><Link className="profile__rl_story_title" to={"/stories/see/" + s._id}>{s.title}</Link></div><div>par <Link className="profile__rl_story_author" to={"/user/profile/"+s.author._id}>{s.author.username_display}</Link></div></div>) : null}</div>
                </div>
            ));

        } else {
            reading_lists = <div>Pas d'histoires !</div>
        }

        return (
            <div className="profile">
                { this.state.showModal ? modal : null }
                <div className="profile__header">
                    {!user.image ? <div className="profile__header_img"><i className="th th-moon"></i></div> : <div className="profile__header_img"><img src={user.image} alt={user.username} /></div>}
                    <h1 className="profile__header_title">{user.username_display}</h1>
                    <h2 className="profile__header_subtitle">@{user.username}</h2>
                </div>
                <div className="profile__buttons">
                    { isMyProfile ? null : isAuthenticated ? <FollowButton {...this.props} /> : null }
                </div>

                <div className="container">
                    <div className="profile__stats">
                        <div className="profile__stats_item"><b>{user.followers.length}</b> followers</div>
                        <div className="profile__stats_item"><b>{user.following.length}</b> abonnement{user.following.length > 1 ? 's' : ''}</div>
                        <div className="profile__stats_item"><b>{user.nb_stories}</b> histoire{user.nb_stories > 1 ? 's' : ''}</div>
                    </div>

                    <div className="profile__flex">
                        <h2 className="profile__title">Histoires de {user.username_display}</h2>
                        <Link className="profile__btn" to={"/user/reading-list/"}>Voir plus</Link>
                    </div>
                    <div className="container">
                        <div className="row">
                            {stories}
                        </div>
                        {user.nb_stories > 6 ? <Link to={"/profile/" + user._id + "/stories"}>Voir plus</Link> : null}
                    </div>
                    <hr />
                    <div className="profile__flex">
                        <h2 className="profile__title">{user.reading_lists ? nbRL : 0} liste{user.reading_lists && user.reading_lists.length > 1 ? 's' : ''} de lecture</h2>
                        <Link className="profile__btn" to={"/user/reading-list/"}>Voir plus</Link>
                    </div>
                    <div className="container">{reading_lists}</div>
                </div>
            </div>
        );
    }
}

export default Profile;