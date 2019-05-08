import React, {Component} from 'react';
import {generatePath} from 'react-router-dom';

class Chapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChapter: ''
        }
        this.handleNext = this.handleNext.bind(this)
    }

    fetchData(id, idChapter) {
        this.props.getChapterById(id, idChapter)
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.idchapter != prevProps.match.params.idchapter) {
            const id =this.props.match.params.id;
            const idChapter =this.props.match.params.idchapter;
            this.fetchData(id, idChapter);
        }
    }
    componentWillUnmount() {
        this.props.resetMe()
    }
    componentDidMount() {
        const id =this.props.match.params.id;
        const idChapter =this.props.match.params.idchapter;
        this.fetchData(id, idChapter);
    }
    handleNext() {
        let currentChapter = this.props.chapter.story.chapters.map(function(e) { return e._id; }).indexOf(this.props.chapter.selectedChapter._id);
        let nextChapter = this.props.chapter.story.chapters[currentChapter + 1];
        this.props.history.push({
            pathname: generatePath(this.props.match.path, {id: this.props.match.params.id, idchapter: nextChapter._id})
        });
    }
    render() {
        console.log("le chapitre")
        console.log(this.props)

        const {isAuthenticated} = this.props.auth;
        const { selectedChapter, loading, error, story } = this.props.chapter;
        let nbComments = '';
        let nbRead = '';
        if (selectedChapter) {
            if (selectedChapter.comments) {
                nbComments = selectedChapter.comments.length
            }
            if (selectedChapter.read) {
                nbRead = selectedChapter.read.length
            }
        }

        if (loading) {
            return <div className="container">Loading...</div>;
        } else if(error) {
            return  <div className="alert alert-danger">{error.message}</div>
        } else if(!selectedChapter) {
            return <span />
        }
        let currentChapter;
        let totalChapters;
        if (story) {
            currentChapter = story.chapters.map(function(e) { return e._id; }).indexOf(selectedChapter._id);
            totalChapters = story.chapters.length;
            console.log("current", currentChapter)
            console.log("total", totalChapters)
        }
        return (
            <div>
                <button onClick={this.props.history.goBack}>Retour</button>
                <h1>{selectedChapter.title}</h1>
                <div>{nbComments} <i className="fas fa-comment"></i> {nbRead} <i className="far fa-eye"></i></div>
                <div dangerouslySetInnerHTML={{ __html: selectedChapter.content }} />
                <hr />
                { currentChapter > 0 ? 'Chapitre précédent' : null}
                { currentChapter < totalChapters ? <div onClick={this.handleNext}>Chapitre suivant</div> : null}
            </div>
        );
    }
}

export default Chapter;