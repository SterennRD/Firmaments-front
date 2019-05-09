import React, {Component} from 'react';
import Pagination from "react-js-pagination";
import StoryModal from "./StoryModal";
import StoryAllList from "./StoryAllList";
class StoryAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            totalPages: 0
        };
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.getAllStories(pageNumber)
        const totalPages = Math.ceil(this.props.stories.storySearch.stories.totalResults / this.props.stories.storySearch.stories.resultsPerPage);
        this.setState({activePage: pageNumber, totalPages: totalPages});
    }
    fetchData(page) {
        this.props.getAllStories(page)
    }

    componentDidUpdate(prevProps) {

    }

    componentWillUnmount() {
        this.props.resetMe()
    }

    componentDidMount() {
        this.fetchData();
    }

    handleModal(story) {
        console.log(story)
        this.setState({ showModal: true, story: story })
    }

    hideModal() {
        this.setState({ showModal: false, story: {} })
    }

    render() {
        const {stories, loading, error} = this.props.stories.storySearch;

        let storySearch;
        let totalPages;

        if (stories && stories.result) {
            storySearch = stories.result.map(s => <div key={s._id}>{s.title}</div>)
        }

        if (stories && stories.totalResults) {
            totalPages = Math.ceil(stories.totalResults / stories.resultsPerPage);
        }
        const modal = <StoryModal
            hideModal={this.hideModal.bind(this)}
            story={this.state.story}
            auth={this.props.auth}
        />;
        return (
            <div>
                { this.state.showModal ? modal : null }
                All stories
                Page {this.state.activePage} sur {this.state.totalPages == 0 ? totalPages : this.state.totalPages}
                <StoryAllList stories={this.props.stories.storySearch} handleModal={e => this.handleModal(e)}/>
                <Pagination
                    activePage={this.state.activePage}
                    activeClass="active"
                    itemsCountPerPage={stories.resultsPerPage}
                    totalItemsCount={stories.totalResults}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                />

            </div>
        );
    }
}

export default StoryAll;