import React from 'react';
import { connect } from 'react-redux';
import { searchStory, resetSearch } from '../actions/SearchAction';
import SearchBar from '../components/SearchBar';

const mapDispatchToProps = (dispatch) => {
    return {
        searchStory: (text, page) => {
            dispatch(searchStory(text, page));
        },
        resetMe: () => {
            dispatch(resetSearch())
        }
    }
}

const mapStateToProps = (state) => ({
    search: state.search
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);