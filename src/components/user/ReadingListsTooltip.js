import React, {Component} from 'react';
import {category} from "../stories/constants";

class ReadingListsTooltip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    fetchData(id) {
        this.props.getReadingLists(id)
    }
    componentDidUpdate(prevProps) {

    }
    componentDidMount() {
        const id = this.props.user.user._id;
        this.fetchData(id);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleAdd(id) {
        console.log(id)
        const idStory = this.props.id;
        const token = localStorage.getItem('jwtToken');
        this.props.addToReadingList(id, idStory, token)
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.props.auth.isAuthenticated) {
            const id = this.props.auth.user._id;
            const idStory = this.props.id;
            const token = localStorage.getItem('jwtToken');
            const title = this.state.title;
            this.props.createReadingList(title, id, idStory, token)
            this.setState({ title: '' })
        } else {
            alert("connectez-vous !")
        }
    }

    render() {
        const { user, userReadingLists, newReadingList } = this.props.user;
        const id = this.props.id;
        let list;

        if (userReadingLists.readingLists) {
            list = userReadingLists.readingLists.map(e => {
                //e.stories.filter( el => el.includes(id))
                const inList = e.stories.some(e => e._id === id)
                const classList = inList ? 'in-list' : 'not-in-list'
                const check = <span><i className="fas fa-check"></i></span>
                const load = <span><i className="fas fa-spinner fa-spin"></i></span>
                return <div className={"rl-tooltip__item rl-tooltip__item--" + classList } id={e._id} onClick={e => this.handleAdd(e.target.id)} key={e._id}>{e.title} <span>{ inList ? check : null} {e.loading ? load : null}</span></div>
            })
        }

        const form = (
            <form className="rl-tooltip__form" onSubmit={this.handleSubmit}>
                <input type="text" className="rl-tooltip__form_input" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Créer une liste de lecture" />
                <button className="rl-tooltip__form_btn" type="submit">Créer</button>
            </form>
        );

        return (
            <div className="rl-tooltip">
                <div className="rl-tooltip__list">{list}</div>
                <div>{newReadingList.loading ? 'chargement' : form}</div>
            </div>
        );
    }
}

export default ReadingListsTooltip;