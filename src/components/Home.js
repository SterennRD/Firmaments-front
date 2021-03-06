import React, { Component } from 'react';
import {Link} from "react-router-dom";
import StoryCard from './stories/StoryCard';
import StoryModal from "./stories/StoryModal";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            story: {}
        }
        this.handleModal = this.handleModal.bind(this)
    }

    fetchData() {
        console.log("je lance le get last stories")
        this.props.getLastStories()
    }
    componentWillUnmount() {
        this.props.resetMe()
    }
    componentDidMount() {
        console.log("component monté")
        this.fetchData();
    }

    handleModal(story) {
        console.log(story)
        this.setState({ showModal: true, story: story })
    }

    hideModal() {
        this.setState({ showModal: false, story: {} })
    }

    calcAge(dateString) {
        var birthday = +new Date(dateString);
        return ((Date.now() - birthday) / (31557600000));
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const { storyList, loading, error } = this.props.stories;
        console.log("les props de home")
        console.log(this.props)
        console.log(localStorage.getItem('jwtToken'))
        let hello;
        let lastStories;
        let birthday;
        const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

        if (loading) {
            return <div className="container">Loading...</div>;
        } else if (error) {
            return  <div className="alert alert-danger">{error.message}</div>
        }

        if (isAuthenticated) {
            hello = <div>Hello {user.username}, vous avez {getAge(user.birth_date)}</div>
        } else {
            hello = <div>Connectez-vous</div>
        }

        if (storyList.stories) {
            lastStories = storyList.stories.map((story) => {

                return (
                    <div key={story._id} className="col-xs-12 col-md-4" onClick={e => this.handleModal(story)}>
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
                )
            })
        }

        const modal = <StoryModal
            hideModal={this.hideModal.bind(this)}
            story={this.state.story}
            auth={this.props.auth}
        />;

        return (
            <div className="homepage">
                <div className="homepage__header">
                    <h1 className="homepage__header_title">Firmaments</h1>
                    <h2 className="homepage__header_subtitle">La nébuleuse d'histoires</h2>
                </div>
                <div className="container">
                    <h2>Dernières histoires</h2>
                    { this.state.showModal ? modal : null }
                    <div className="row">
                        {lastStories}
                    </div>
                    <Link to={'/stories/all'}>Voir plus</Link>
                </div>
            </div>
        );
    }
}


export default Home;