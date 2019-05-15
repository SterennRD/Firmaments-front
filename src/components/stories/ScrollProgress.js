import React, {Component} from 'react';
import PropTypes from "prop-types";

class ScrollProgress extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {width, height} = this.props
        return (
            <div className="scrollbar">
                <div className="scrollbar__progress" style={this.props.style} />
            </div>
        );
    }
}

export default ScrollProgress;