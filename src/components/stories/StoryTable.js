import React, {Component} from 'react';
import ChapterList from "./ChapterList";
import {Link} from "react-router-dom";


class StoryTable extends Component {

    componentDidMount() {
        if (!this.props.story || this.props.story === undefined) {
            console.log("je fais appel à l'API")
            const id =this.props.match.params.id;
            this.props.getStoryById(id)
        }
    }

    render() {
        console.log("table des matières")
        console.log(this.props)
        const { loading, error } = this.props.stories.selectedStory;
        let {story} = '';
        if (!this.props.story || this.props.story === undefined) {
            story = this.props.stories.selectedStory.story
        } else {
            story = this.props.story;
        }

        if (loading) {
            return <div className="container">Loading...</div>;
        } else if(error) {
            return  <div className="alert alert-danger">{error.message}</div>
        } else if(!story) {
            return <span />
        }
        console.log("story")
        console.log(story)
        return (
            <div>
                <div className="d-flex">
                    <Link to={this.props.match.url + '/edit/' + story._id}><h2>Informations de l'histoire</h2></Link>
                    <h2>Table des matières</h2>
                </div>
                {story.title}
                <Link to={this.props.match.url + '/' + story._id + '/chapter/new'} className="btn btn-primary">Ajouter un chapitre</Link>
                <ChapterList {...this.props} chapters={story.chapters}/>
            </div>
        );
    }
}

export default StoryTable;