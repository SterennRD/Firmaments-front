import React, {Component} from 'react';

class ReadingListDetail extends Component {
    fetchData(id) {
        this.props.getReadingList(id)
    }
    componentWillUnmount() {
        this.props.resetMe();
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        this.fetchData(id)
    }
    render() {
        console.log("rl", this.props)
        return (
            <div>
                details rl
            </div>
        );
    }
}

export default ReadingListDetail;