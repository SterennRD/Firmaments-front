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
    }

    handleChange(event) {
        this.setState({searchText: event.target.value});
        console.log(this.state.searchText)
        var myString = event.target.value;
        var withoutSpace = myString.replace(/ /g,"");
        var nbLetters = withoutSpace.length;
        if (nbLetters >= 2) {
            this.fetchData(event.target.value)
        } else {
            this.setState({results: []})
        }
        if (this.state.searchText !== '') {
            //this.fetchData(this.state.searchText)
        }
    }

    handleSearch() {
        this.props.history.push('/')
    }
    handleBlur() {
        this.setState({showResults: false})
    }
    handleFocus() {
        this.setState({showResults: true})
    }

    fetchData(text) {
        console.log("search text: " + text)
        console.log("props search")
        console.log(this.props)
        const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/stories' : '/stories';
        axios.get(`${ROOT_URL}/search/story/?search=${text}`)
            .then((response) => {
                console.log(response.data)
                if (response.status === 200){
                    this.setState({results: response.data.result, nbResults: response.data.totalResults})
                } else {
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        let results;
        let resultsLink;
        console.log(this.state.results)
        if (this.state.results.length > 0) {
            results = this.state.results.map( e => (
                <div key={e._id} className="d-flex justify-content-space-between">
                    <Link to={'/stories/see/' + e._id}>{e.title}</Link>
                    <div>Par {e.author.username_display}</div>
                </div>
                )
            )
        }
        if (this.state.nbResults > 0) {
            resultsLink = (
                    <div className="d-flex justify-content-space-between">
                        <Link to={'/stories/see/'}>Voir les {this.state.nbResults} résultats</Link>
                    </div>
                )
        }
        return (
            <div className="navbar-nav ml-auto">

                <input onFocus={this.handleFocus} onBlur={this.handleBlur} type="text" autoComplete="off" name="search-bar" value={this.state.searchText} onChange={this.handleChange}/>
                <button onClick={this.handleSearch}>Recherche</button>
                { this.state.showResults ? (
                    <div className="d-flex flex-column">
                        {results}
                        {resultsLink}
                    </div>
                ) : (
                    null
                )}

            </div>
        );
    }
}

export default SearchBar;