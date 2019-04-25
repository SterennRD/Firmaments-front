import React, {Component} from 'react';

class Chapter extends Component {
    fetchData(id, idChapter) {
        this.props.getChapterById(id, idChapter)
    }
    componentWillUnmount() {
        this.props.resetMe()
    }
    componentDidMount() {
        const id =this.props.match.params.id;
        const idChapter =this.props.match.params.idchapter;
        this.fetchData(id, idChapter);
    }
    render() {
        console.log("le chapitre")
        console.log(this.props)

        const {isAuthenticated} = this.props.auth;
        const { selectedChapter, loading, error } = this.props.chapter;
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
        return (
            <div>
                <button onClick={this.props.history.goBack}>Retour</button>
                <h1>{selectedChapter.title}</h1>
                <div>{nbComments} <i className="fas fa-comment"></i> {nbRead} <i className="far fa-eye"></i></div>
                <div dangerouslySetInnerHTML={{ __html: selectedChapter.content }} />
            </div>
        );
    }
}

export default Chapter;