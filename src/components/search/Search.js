import React, {Component} from 'react';
import StoryCard from "../stories/StoryCard";
import StoryModal from "../stories/StoryModal";
import StoryAllList from "../stories/StoryAllList";
import Pagination from "react-js-pagination";
import SearchResults from "./SearchResults";
import {category} from "../stories/constants";


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            story: {},
            searchText: '',
            activePage: 1,
            totalPages: 0,
            selectedStories: [],
            selectedCategories: [],
            stories: [],
            checked: false
        }
        this.handleModal = this.handleModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.launchSearch = this.launchSearch.bind(this)
        this.handleFilters = this.handleFilters.bind(this)
        this.updateFilters = this.updateFilters.bind(this)
        this.updateMovies = this.updateMovies.bind(this)
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        console.log(`search text is ${this.state.searchText}`);
        this.props.searchStory(this.state.searchText, pageNumber)
        const totalPages = Math.ceil(this.props.search.totalResults / this.props.search.resultsPerPage);
        this.setState({activePage: pageNumber, totalPages: totalPages});
    }

    componentDidUpdate(prevProps) {
        console.log("prevprops", prevProps)
        if (this.state.stories !== this.props.search.searchStory) {
            console.log("je change le state de search")
            this.setState({stories : this.props.search.searchStory, defaultData: this.props.search.searchStory})
        }
    }

    updateMovies = (e) => {
        if (e.target.checked) {
            this.setState({selectedCategories: [...this.state.selectedCategories, e.target.name]})
            console.log("cat sélec", this.state.selectedCategories)
            const currState = this.props.search.searchStory;
            const newState = currState.filter(story => {
                for (let i = 0; i < story.category.length; i++) {
                    if (story.category[i].id === parseInt(e.target.name)) {
                        return true
                    }
                }
                return false
            });
            console.log("je sélectionne", newState)
            this.setState({selectedStories: [...new Set([...this.state.selectedStories, ...newState])]});
        } else {
            const currState = [...this.state.selectedCategories];
            const newState = currState.filter(story => !story.includes(parseInt(e.target.name)));
            this.setState({selectedCategories: newState});
            console.log("cat sélec", this.state.selectedCategories)
            const currStories = [...this.state.selectedStories];
            const newStateStories = currStories.filter(story => {
                console.log(story)
                for (let i = 0; i < story.category.length; i++) {
                    if (story.category[i].id !== parseInt(e.target.name)) {
                        return true
                    }
                }
                return false
            });
            this.setState({selectedStories: newStateStories});
        }
    };

    launchSearch() {
        console.log(this.state.searchText)
        var myString = this.state.searchText;
        var withoutSpace = myString.replace(/ /g,"");
        var nbLetters = withoutSpace.length;
        if (nbLetters >= 2) {
            this.props.searchStory(this.state.searchText)
        } else {
            this.setState({results: [], nbResults: 0})
            //this.props.resetMe()
        }
        if (this.state.searchText !== '') {
            //this.fetchData(this.state.searchText)
        }
    }

    handleChange(event) {
        const myValue = event.target.value;
        this.setState({searchText: myValue});
    }

    handleModal(story) {
        console.log(story)
        this.setState({ showModal: true, story: story })
    }

    hideModal() {
        this.setState({ showModal: false, story: {} })
    }

    handleFilters(e) {
        console.log(e.target.value)
    }

    essai () {
        console.log("selected categoies", this.state.selectedCategories)
        const currState = [...this.state.stories];
        var filtered = currState.filter(story => {
            // Use map to get a simple array of "val" values. Ex: [1,4]
            let yFilter = story.map(itemY => { return itemY.category; });

            // Use filter and "not" includes to filter the full dataset by the filter dataset's val.
            let filteredX = yFilter.filter(c => c.id.includes(this));

            // Print the result.
            console.log(filteredX);
            }
        );
        console.log(filtered);
        const newState = currState.filter(story =>
            story.category.filter(c =>
                this.state.selectedCategories.every(genreId => {
                        if (c.id === genreId) {
                            return true
                        }
                        return false;
                    }
                )
            )
        );
        console.log(newState)
    }

    updateFilters(e) {
        console.log(e.target.name)
            if (e.target.checked) {
                /*this.setState({selectedCategories: [...this.state.selectedCategories, e.target.name]}, () =>{
                    this.essai()
                })*/
                //const currState = [...this.state.stories];
                this.setState({selectedCategories: [...this.state.selectedCategories, e.target.name]})
                const currState = this.props.search.searchStory;
                console.log(currState)
                console.log(currState.map(s => s.category.id))
                const newState = currState.filter(story => {
                    for (let i = 0; i < story.category.length; i++) {
                        console.log(story.category[i])
                        console.log(story.category[i].id)
                        if (story.category[i].id === parseInt(e.target.name)) {
                            return true
                        }
                    }
                    return false
                });
                var mergedArrayWithoutDuplicates = newState.concat(
                    this.state.selectedStories.filter(seccondArrayItem => !newState.includes(seccondArrayItem))
                );
                console.log(mergedArrayWithoutDuplicates)
                console.log(newState)
                console.log("déjà sélectionné", this.state.selectedStories)
                console.log("on merge", [...this.state.selectedStories, ...newState])
                this.setState({selectedStories: [...new Set([...this.state.selectedStories, ...newState])]});
                /*this.setState(prevState => ({
                    selectedStories:  [...newState, ...prevState.selectedStories]
                }));*/
                console.log("NOUVELLE SELECTION", this.state.selectedStories)
            } else {

                    const currState = [...this.state.selectedStories];

                const newState = currState.filter(story => {
                    for (let i = 0; i < story.category.length; i++) {
                        console.log(story.category[i])
                        console.log(story.category[i].id)
                        if (story.category[i].id !== parseInt(e.target.name)) {
                            return true
                        }
                    }
                    return false
                });
                console.log("avant", currState)
                console.log("après", newState)
                    this.setState(prevState => ({
                        movies:newState,
                        selectedStories: []
                    }));

            }

    }
    render() {
        const {searchStory, loading, error, totalResults, searchText, resultsPerPage} = this.props.search;

        const modal = <StoryModal
            hideModal={this.hideModal.bind(this)}
            story={this.state.story}
            auth={this.props.auth}
        />;
        const totalPages = Math.ceil(totalResults / resultsPerPage);

        const categories = category.map(c => <div key={c.id}><label htmlFor={c.id}>{c.label}</label><input id={c.id} name={c.id} onChange={this.updateMovies} type="checkbox"/></div>)
        console.log("this.state.selectedCategories", this.state.selectedCategories)
        return (
            <div>
                { this.state.showModal ? modal : null }
                <h2>{searchText}</h2>
                <div>{totalResults} résultat{totalResults > 1 ? 's' : null}</div>
                <input onChange={this.handleChange} type="text" id="search" placeholder="Tapez votre recherche..." value={this.state.searchText}/>
                <a onClick={this.launchSearch}>Lancer la recherche</a>

                {this.props.search.searchStory ?
                    <div>Page {this.state.activePage} sur {this.state.totalPages === 0 ? totalPages : this.state.totalPages}</div>
                    :
                    null
                }
                {this.state.stories ?
                    <div>
                        {categories}
                    </div>
                    :
                    null
                }
                <div>
                    <label htmlFor="tri">Trier par</label>
                    <select onChange={this.handleFilters} name="tri">
                        <option value="0">Toutes les catégories</option>
                        <option value="1">Date croissante</option>
                    </select>
                </div>
                <div>
                    <div>
                        <label htmlFor="tout">Tout</label>
                        <input type="radio" id="tout" name="tri-statut"/>
                    </div>
                    <div>
                        <label htmlFor="en-cours">En cours</label>
                        <input type="radio" id="en-cours" name="tri-statut"/>
                    </div>
                    <div>
                        <label htmlFor="termine">Terminé</label>
                        <input type="radio" id="termine" name="tri-statut"/>
                    </div>
                </div>

                {this.state.selectedCategories.length < 1 ? 'aucune catégoruie sélectionnée' : 'catégrie sélectionnée '}
                <SearchResults results={this.state.selectedCategories.length < 1 ? this.props.search.searchStory : this.state.selectedStories} stories={this.props.search} handleModal={e => this.handleModal(e)}/>
                {/*<SearchResults results={this.state.stories} stories={this.props.search} handleModal={e => this.handleModal(e)}/>*/}
                <Pagination
                    activePage={this.state.activePage}
                    activeClass="active"
                    itemsCountPerPage={resultsPerPage}
                    totalItemsCount={totalResults}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                />
            </div>
        );
    }
}

export default Search;