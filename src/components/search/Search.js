import React, {Component} from 'react';

class Search extends Component {
    render() {
        const {search, loading, error, totalResults, searchText} = this.props.search;

        if (loading) {
            return <div>Loading</div>
        }
        if (error) {
            return <div>{error.message}</div>
        }
        if (!search || !searchText) {
            return <span/>
        }

        return (
            <div>
                <h2>{searchText}</h2>
                <div>{totalResults} résultat{totalResults > 1 ? 's' : null}</div>
            </div>
        );
    }
}

export default Search;