import React, {Component} from 'react';
import Pagination from "react-js-pagination";
class StoryAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.getAllStories(pageNumber)
        this.setState({activePage: pageNumber});
    }
    fetchData(page) {
        this.props.getAllStories(page)
    }

    componentWillUnmount() {
        this.props.resetMe()
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const {stories, loading, error} = this.props.stories.storyList;

        if (loading) {
            return <div className="container">Loading...</div>;
        } else if(error) {
            return  <div className="alert alert-danger">{error.message}</div>
        } else if(!stories) {
            return <span />
        }

        let storyList;

        if (stories.result) {
            storyList = stories.result.map(s => <div key={s._id}>{s.title}</div>)
        }

        const totalPages = Math.ceil(stories.totalResults / stories.resultsPerPage);

        return (
            <div>
                All stories
                Page {stories.page} sur {totalPages}
                {storyList}
                <Pagination
                    activePage={this.state.activePage}
                    activeClass="active"
                    itemsCountPerPage={2}
                    totalItemsCount={stories.totalResults}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                />

            </div>
        );
    }
}

export default StoryAll;