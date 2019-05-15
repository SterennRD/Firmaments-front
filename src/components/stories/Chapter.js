import React, {Component} from 'react';
import {generatePath} from 'react-router-dom';
import moment from "moment/min/moment-with-locales.min";
import {Link} from "react-router-dom";
import CommentForm from "../../containers/CommentFormContainer";
import ScrollProgress from "./ScrollProgress";



class Chapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChapter: '',
            scrollY: 0,
            scrolled: 0
        }
        this.handleNext = this.handleNext.bind(this)
        this.handlePrev = this.handlePrev.bind(this)
        this.scrollProgress = this.scrollProgress.bind(this);
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
        window.removeEventListener("scroll", this.scrollProgress);
    }
    componentDidMount() {
        const id =this.props.match.params.id;
        const idChapter =this.props.match.params.idchapter;
        this.fetchData(id, idChapter);
        window.addEventListener('scroll', this.ScrollRateCalculation);
        window.addEventListener("scroll", this.scrollProgress);
    }
    scrollProgress() {
        if (document.getElementById('contenu')) {

            const scrollPx = document.documentElement.scrollTop;
            const docHeight = document.getElementById('contenu').clientHeight;
            const scrolled = `${scrollPx / docHeight * 100}%`;

            this.setState({
                scrolled: parseInt(scrolled)
            });
        }

    };

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

        const progressBarStyle = {
            width: this.state.scrolled + "%"
        };

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
                    <div key={c._id} className="chapter__comments_comment">
                        {c.author.image ? 'image' : <div className="chapter__comments_img chapter__comments_img--small"><i className="fas fa-user"></i></div> }
                        <div>
                        <div className="chapter__comments_comment_author">Par <Link to={"/user/profile/" + c._id}>{c.author.username_display}</Link></div>
                        <div className="chapter__comments_comment_date">{moment(c.created_at).format('LLL')}</div>
                        <p className="chapter__comments_comment_content">{c.content}</p>
                        </div>
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

        let isMyChapter = false;

        if (this.props.auth.isAuthenticated) {
            if (this.props.auth.user._id === this.props.chapter.story.author) {
                isMyChapter = true;
            }
        }

        return (
            <div className="chapter">
                <ScrollProgress style={progressBarStyle} width={this.state.scrolled} height={3}/>
                <div className="chapter__header">
                    <div>
                        <Link to={'/stories/toc/' + story._id}><i className="fas fa-arrow-left"></i> Retour</Link>
                        <div>
                            {story.title}
                            <div>Par {story.author.username_display}</div>
                        </div>
                    </div>
                    <div className="chapter__plus"><i className="fas fa-plus"></i></div>
                </div>

                <div className="container">
                    <div className="chapter__content">
                        <div className="chapter__content_header">
                            <h1 className="chapter__content_header_title">{selectedChapter.title}</h1>
                            <div className="chapter__content_header_stats">
                                <div>{nbComments} <i className="fas fa-comment"></i></div>
                                <div>{nbRead} <i className="far fa-eye"></i></div>
                                <div>{readingTime} min <i className="far fa-clock"></i></div>
                            </div>
                        </div>
                        <div className="chapter__content_text" id="contenu" dangerouslySetInnerHTML={{ __html: selectedChapter.content }} />
                    </div>

                    <hr />
                    <div className="chapter__buttons">
                        { currentChapter > 0 ? <div className="chapter__buttons_btn" onClick={this.handlePrev}>Chapitre précédent</div> : <div className="chapter__buttons_btn chapter__buttons_btn--disabled">Chapitre précédent</div>}
                        { currentChapter + 1 < totalChapters ? <div className="chapter__buttons_btn" onClick={this.handleNext}>Chapitre suivant</div> : null}
                    </div>

                    <hr />

                    <h2 className="chapter__comments_title">Commentaires</h2>
                    {story.comment_authorized ?
                        <CommentForm/>
                        :
                        <div>Vous ne pouvez pas commenter l'histoire</div>
                    }


                    {comments}

                </div>
            </div>
        );
    }
}

export default Chapter;