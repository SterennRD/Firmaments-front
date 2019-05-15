import React, {Component} from 'react';

class Like extends Component {
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
        console.log("props de like")
        console.log(this.props)
        const {isAuthenticated, user} = this.props.auth;
        const { loading, error, likes } = this.props.stories.likeList;
        const { story } = this.props.stories.selectedStory;
        const faved = isAuthenticated ? likes.findIndex(item => item.user === user._id) : null;
        return (
            <div>
                <span className={`storyDetails__like ${faved !== -1  ? 'storyDetails__like--liked' : ''}`} id={story._id} onClick={(e) => this.handleLike(e.target.id)}>Aimer <i id={story._id} className="fa fa-heart"></i></span>
            </div>
        );
    }
}

export default Like;