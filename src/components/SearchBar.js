import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            results: [],
            nbResults: 0,
            showResults: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleSeeResults = this.handleSeeResults.bind(this)
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.search.search !== this.props.search.search) {
            this.setState({results: this.props.search.search})
        }
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({showResults: false})

        }
    }

    launchSearch(text) {
        var myString = text;
        var withoutSpace = myString.replace(/ /g,"");
        var nbLetters = withoutSpace.length;
        if (nbLetters >= 2) {
            this.props.searchStory(this.state.searchText)
        } else {
            this.setState({results: [], nbResults: 0})
        }
        if (this.state.searchText !== '') {
            //this.fetchData(this.state.searchText)
        }
    }

    handleChange(event) {
        const myValue = event.target.value;
        this.setState({searchText: myValue}, () => {
            this.launchSearch(this.state.searchText)
        });
    }

    handleSearch(e) {
        e.preventDefault()
        console.log("j'envoie le formulaire")
        this.props.history.push('/search')
    }
    handleBlur() {
        //this.setState({showResults: false})
    }
    handleFocus() {
        this.setState({showResults: true})
    }

    handleSeeResults() {
        console.log("RESULTS")
        this.setState({showResults: false})
        this.props.history.push('/search')
    }
    fetchData(text) {
        const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/stories' : '/stories';
        axios.get(`${ROOT_URL}/search/story/?search=${text}`)
            .then((response) => {
                if (response.status === 200){
                    this.setState({results: response.data.result, nbResults: response.data.totalResults})
                } else {
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    render() {
        let results;
        let resultsLink;
        const {search, loading, error, totalResults} = this.props.search;
        if (this.state.results.length > 0) {
            results = this.state.results.map( e => (
                <div key={e._id} className="d-flex justify-content-space-between">
                    <Link to={'/stories/see/' + e._id}>{e.title}</Link>
                    <div>Par {e.author.username_display}</div>
                </div>
                )
            )
        }
        if (totalResults && totalResults > 0) {
            resultsLink = (
                    <div className="d-flex justify-content-space-between">
                        <button type="submit">Voir les {totalResults} résultats</button>
                    </div>
                )
        }
        return (
            <div className="navbar-nav ml-auto" ref={this.setWrapperRef}>
                <form onSubmit={this.handleSearch}>
                    <input onFocus={this.handleFocus} onBlur={this.handleBlur} type="text" autoComplete="off" name="search-bar" value={this.state.searchText} onChange={this.handleChange}/>
                    <button type="submit">Recherche</button>
                    { this.state.showResults ? (
                        <div className="d-flex flex-column">
                            {results}
                            {resultsLink}
                        </div>
                    ) : (
                        null
                    )}
                </form>
            </div>
        );
    }
}

export default SearchBar;