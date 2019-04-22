import React, { Component } from 'react';

class Home extends Component {
    fetchData() {
        this.props.getLastStories()
    }
    componentWillUnmount() {
        this.props.resetMe()
    }
    componentDidMount() {;
        this.fetchData();
    }

    calcAge(dateString) {
        var birthday = +new Date(dateString);
        return ((Date.now() - birthday) / (31557600000));
    }

    render() {
        const {user} = this.props.auth;
        const { storyList, loading, error } = this.props.stories;
        console.log("les props de home")
        console.log(this.props)
        let hello;
        let lastStories;
        let birthday;
        const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

        if (loading) {
            return <div className="container">Loading...</div>;
        } else if (error) {
            return  <div className="alert alert-danger">{error.message}</div>
        }

        if (user) {
            hello = <div>Hello {user.username}, vous avez {getAge(user.birth_date)}</div>
        } else {
            hello = <div>Connectez-vous</div>
        }

        if (storyList) {
            lastStories = storyList.stories.map((story) => <div key={story._id}>{story.title}</div>)
        }
        return (
            <div>
                {hello}
                <h2>Dernières histoires</h2>
                {lastStories}
            </div>
        );
    }
}


export default Home;