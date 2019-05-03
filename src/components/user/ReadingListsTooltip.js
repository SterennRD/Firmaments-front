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
        console.log(this.state.title)
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
            console.log("créer une liste de lecture")
            this.props.createReadingList(title, id, idStory, token)
        } else {
            alert("connectez-vous !")
        }
    }

    render() {
        const { user, userReadingLists } = this.props.user;
        const id = this.props.id;
        let list;
        if (userReadingLists.readingLists) {

            list = userReadingLists.readingLists.map(e => {
                //e.stories.filter( el => el.includes(id))
                const inList = e.stories.includes(id)
                const check = <span><i className="fas fa-check"></i></span>
                const load = <span><i className="fas fa-spinner fa-spin"></i></span>
                return <div className={ inList ? 'in-list' : 'not-in-list'} id={e._id} onClick={e => this.handleAdd(e.target.id)} key={e._id}>{e.title} { inList ? check : null} {e.loading ? load : null}</div>
            })
        }
        return (
            <div>
                Reading list de {user.username}
                {list}
                <form onSubmit={this.handleSubmit}>
                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Créer une liste de lecture" />
                <button type="submit">Créer</button>
                </form>
            </div>
        );
    }
}

export default ReadingListsTooltip;