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
            <div className="storyTable">
                <div className="storyTable__header">
                    <h1 className="storyTable__header_title">Table des matières</h1>
                    <div className="storyTable__header_tabs">
                        <Link to={'/stories/edit/' + story._id}>
                            <h2 className="storyTable__header_subtitle">Informations de l'histoire</h2>
                        </Link>
                        <h2 className="storyTable__header_subtitle storyTable__header_subtitle--active">Table des matières</h2>
                    </div>
                </div>
                <div className="container storyTable__content">
                    <div className="storyTable__content_header">
                        <div className="storyTable__content_title">{story.title}</div>
                        <Link to={'/stories/' + story._id + '/chapter/new'} className="storyTable__btn btn btn-primary"><i className="fas fa-plus"></i> Ajouter un chapitre</Link>
                    </div>
                        <ChapterList {...this.props} chapters={story.chapters}/>
                </div>
            </div>
        );
    }
}

export default StoryTable;