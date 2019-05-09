import React, {Component} from 'react';
import {generatePath} from 'react-router-dom';
import moment from "moment/min/moment-with-locales.min";
import {Link} from "react-router-dom";
import CommentForm from "../../containers/CommentFormContainer";
import ManageScrollBar from "./ScrollBar";



class Chapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChapter: '',
            scrollY: 0
        }
        this.handleNext = this.handleNext.bind(this)
        this.handlePrev = this.handlePrev.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
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
        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll(event) {


        // Annoying to compute doc height due to browser inconsistency
        var winHeight = window.innerHeight;
        var docHeight = document.getElementById('contenu').clientHeight;
        var max = docHeight - winHeight;

        var value = document.documentElement.scrollTop;

        console.log("doc heigh", winHeight, "element height", docHeight, "max", max, "scroll", value)
        this.setState({scrollY: value});
        if (value > docHeight) {
            console.log('fin du document')
        }
    }
    handlePrev() {
        let currentChapter = this.props.chapter.story.chapters.map(function(e) { return e._id; }).indexOf(this.props.chapter.selectedChapter._id);
        let prevChapter = this.props.chapter.story.chapters[currentChapter - 1];
        this.props.history.push({
            pathname: generatePath(this.props.match.path, {id: this.props.match.params.id, idchapter: prevChapter._id})
        });
    }
    handleNext() {
        let currentChapter = this.props.chapter.story.chapters.map(function(e) { return e._id; }).indexOf(this.props.chapter.selectedChapter._id);
        let nextChapter = this.props.chapter.story.chapters[currentChapter + 1];
        this.props.history.push({
            pathname: generatePath(this.props.match.path, {id: this.props.match.params.id, idchapter: nextChapter._id})
        });
    }
    render() {
        moment.locale('fr');
        console.log("le chapitre")
        console.log(this.props)

        const {isAuthenticated} = this.props.auth;
        const { selectedChapter, loading, error, story } = this.props.chapter;
        let nbComments = '';
        let nbRead = '';
        let comments;
        let readingTime;
        if (selectedChapter) {
            if (selectedChapter.comments && selectedChapter.comments.length > 0 ) {
                nbComments = selectedChapter.comments.length
                comments = selectedChapter.comments.map(c => (
                    <div key={c._id}>
                        <div>Par <Link to={"/user/profile/" + c._id}>{c.author.username_display}</Link></div>
                        <div>{moment(c.created_at).format('LLL')}</div>
                        <p>{c.content}</p>
                    </div>
                ))
            } else {
                comments = <div>Pas de commentaires</div>
            }
            if (selectedChapter.read) {
                nbRead = selectedChapter.read.length
            }
        }

        if (loading) {
            return <div className="container">Loading...</div>;
        } else if(error) {
            return  <div className="alert alert-danger">{error.message}</div>
        } else if(!selectedChapter || !story) {
            return <span />
        }
        let currentChapter;
        let totalChapters;
        if (story) {
            readingTime = Math.round(selectedChapter.content.split(' ').length / 300);
            let nbWords = selectedChapter.content.split(' ').length;
            console.log("nombre de mots :", nbWords, "temps de lecture: ", readingTime)
            currentChapter = story.chapters.map(function(e) { return e._id; }).indexOf(selectedChapter._id);
            totalChapters = story.chapters.length;
            console.log("current", currentChapter)
            console.log("total", totalChapters)
        }

        return (
            <div>
                <ManageScrollBar className="scroll-bar"/>
                <Link to={'/stories/toc/' + story._id}>Retour</Link>
                <h1>{selectedChapter.title}</h1>
                <div>{nbComments} <i className="fas fa-comment"></i> {nbRead} <i className="far fa-eye"></i> {readingTime} min <i className="far fa-clock"></i></div>
                <div id="contenu" dangerouslySetInnerHTML={{ __html: selectedChapter.content }} />
                <hr />
                { currentChapter > 0 ? <div onClick={this.handlePrev}>Chapitre précédent</div> : null}
                { currentChapter + 1 < totalChapters ? <div onClick={this.handleNext}>Chapitre suivant</div> : null}
                <hr />
                <h2>Commentaires</h2>
                <CommentForm/>
                {comments}
            </div>
        );
    }
}

export default Chapter;