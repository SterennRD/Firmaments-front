import React, {Component} from 'react';
//import StoryDetails from "../../containers/StoryDetailsContainer";
import StoryDetails from "./StoryDetails";
import StoryList from "./StoryList";
import {Link, Route} from "react-router-dom";
import StoryForm from "./StoryFormWizard";
import StoryInfoForm from "./StoryInfoForm";
import StoryInfoFormEdit from "../../containers/StoryInfoFormContainer";
import StoryTable from "./StoryTable";
import ChapterForm from "./ChapterForm";
import Chapter from "../../containers/ChapterContainer";
import ChapterFormEdit from "../../containers/ChapterFormContainer";
import StoryAll from "../../containers/StoryAllContainer";


class Story extends Component {
    render() {
        const { stories } = this.props.stories;
        return (
            <div>
                {/* Create a story */}
                <Route exact path={this.props.match.url + '/new'}
                       render={() => <StoryForm {...this.props}
                       />}
                />
                {/* Edit a story */}
                {/*<Route exact path={this.props.match.url + '/edit/:id'}
                       render={() => <StoryForm {...this.props}
                       />}
                />*/}
                <Route exact path={this.props.match.url + '/edit/:id'}
                       render={() => <StoryInfoFormEdit
                                                    mode='edit'
                                                    location={this.props.location}
                                                    match={this.props.match}
                                                    history={this.props.history}

                       />}
                />
                {/* List of stories */}
                <Route exact path={this.props.match.url}
                       render={() => <StoryList {...this.props}
                       />}
                />
                {/* List of all stories */}
                <Route exact path={this.props.match.url + '/all'}
                       render={() => <StoryAll {...this.props}
                       />}
                />
                {/* See details of story */}
                <Route exact path={this.props.match.url + '/see/:id'}
                       render={(props) => <StoryDetails {...this.props}
                                                        story={stories.stories.find(s => s._id === props.match.params.id )}
                       />}
                />

                {/* Table of content */}
                <Route exact path={this.props.match.url + '/toc/:id'}
                       render={(props) => <StoryTable {...this.props}
                                                 story={stories.stories.find(s => s._id === props.match.params.id )}
                       />}
                />
                {/* Create a chapter */}
                <Route exact path={this.props.match.url + '/:id/chapter/new'}
                       render={() => <ChapterForm {...this.props}
                            mode="create"
                            story={stories.selectedStory.story}
                       />}
                />
                {/* Edit a chapter */}
                <Route exact path={this.props.match.url + '/:id/chapter/:idchapter/edit'}
                       render={(props) => <ChapterFormEdit
                                                  mode="edit"
                                                  storyID={ props.match.params.id }
                                                  chapterID={ props.match.params.idchapter }
                                                  location={this.props.location}
                                                  history={this.props.history}
                                                  //initialValues={this.props.chapter.selectedChapter}
                       />}
                />
                {/* See a chapter */}
                <Route exact path={this.props.match.url + '/:id-:idchapter/'}
                       render={(props) => <Chapter
                           {...props}
                       />}
                />
            </div>
        );
    }
}

export default Story;