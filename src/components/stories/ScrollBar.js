import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import '../style/scrollbar.scss';

class ScrollBar extends React.Component {
    render() {
        const {width, height} = this.props;
        return (
            <div className="scrollbar"
                 style={{
                     border: 'solid 1px lightgray',
                     height,
                     backgroundColor: "#f4f6f9"
                 }}
            >
                <div
                    className="scrollbar"
                    id="hoge" style={{
                    width: `${width}%`,
                    height,
                    backgroundColor: "#40aa94"
                }} />
            </div>
        );
    }
}
ScrollBar.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

ScrollBar.defaultProps = {
    height: 10,
    width: 0
};

/** ManageScrollBar */
class ManageScrollBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: 0,
            scrollBarRate: 0
        };
        this.ScrollRateCalculation = this.ScrollRateCalculation.bind(this);
    }

    ScrollRateCalculation() {
        let innerHeight = window.innerHeight; //A
        let bodyElement = document.getElementById('contenu');//B1
        let rect = bodyElement.getBoundingClientRect();//B2
        let heightIsHtml = rect.height; //B3
        let scrollMax = Math.ceil( heightIsHtml - innerHeight ); //C = B3 - A
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop;//D
        let scrollRate = parseInt( (scrollY / scrollMax) * 100, 10 ); //E = (D / C) *100
        this.setState({
            scrollY: scrollY,
            scrollBarRate: scrollRate
        });
    }

    componentDidMount() {
        this.ScrollRateCalculation();

        document.addEventListener('scroll', this.ScrollRateCalculation);
        window.addEventListener('hashchange', this.ScrollRateCalculation);
        document.addEventListener('click', this.ScrollRateCalculation);
    }

    render() {
        return (
            <div>
                <ScrollBar className="scrollbar" width={this.state.scrollBarRate}/>
            </div>
        )
    }
}
export default ManageScrollBar;