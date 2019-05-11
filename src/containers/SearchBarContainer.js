import React from 'react';
import { connect } from 'react-redux';
import { searchStory } from '../actions/SearchAction';
import SearchBar from '../components/SearchBar';

const mapDispatchToProps = (dispatch) => {
    return {
        searchStory: (text, page) => {
            dispatch(searchStory(text, page));
        }
    }
}

const mapStateToProps = (state) => ({
    search: state.search
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);