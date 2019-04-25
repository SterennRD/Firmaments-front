import React, { Component } from 'react';
import {Link} from "react-router-dom";


class Home extends Component {
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
                    <div key={story._id} className="col-sm-3">
                        <h3><Link to={'/stories/see/' + story._id}>{story.title}</Link> <span className="badge badge-primary">{story.rating ? story.rating.label : null}</span></h3>
                        <h4>Par {story.author ? story.author.username : "auteur"}</h4>
                        <p>{story.description}</p>
                        <div>{story.nb_likes} <i className="fas fa-heart"></i> {story.nb_favorites} <i className="fas fa-star"></i> {story.nb_comments} <i className="fas fa-comment"></i></div>
                    </div>
                )
            })
        }
        return (
            <div>
                {hello}
                <h2>Dernières histoires</h2>
                <div className="container">
                    <div className="row">
                        {lastStories}
                    </div>
                    <Link to="">Voir plus</Link>
                </div>
            </div>
        );
    }
}


export default Home;