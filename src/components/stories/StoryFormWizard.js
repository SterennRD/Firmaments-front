import React, { Component } from 'react'
import StoryInfoForm from './StoryInfoForm'
import ChapterForm from './ChapterForm'


class StoryFormWizard extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page: 1
        };
    }
    nextPage() {
        this.setState({ page: this.state.page + 1 })
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }

    componentDidMount() {
        //console.log("wizard");
        //console.log(this.props);
    }

    render() {
        const { page } = this.state;

        return (
            <div>
                {page === 1 && <StoryInfoForm
                    {...this.props}
                    onSubmit={this.nextPage}
                    mode='create'
                />}
                {page === 2 && (
                    <ChapterForm
                        {... this.props}
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                        mode='createStory'
                    />
                )}
            </div>
        )
    }
}

export default StoryFormWizard