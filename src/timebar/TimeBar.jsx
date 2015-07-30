require('./_timebar.scss');

import React from 'react';

const PropTypes = React.PropTypes;

export default class TimeBar extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        var value = (value)=> {
                return this.props.scale(value) + '%';
            },
            barStyle = {
                left: value(this.props.start),
                width: value(this.props.total)
            },
            contentLoadBarStyle = {
                left: value(this.props.domContentLoad)
            },
            pageLoadBarStyle = {
                left: value(this.props.pageLoad)
            };


        return (
            <div className="timebar" onClick={this._onTimeBarClick.bind(this)}>
                <div className="timebar-mark timebar-mark-time" style={barStyle}></div>
                <span className="timebar-label">{Math.round(this.props.total)} ms</span>
                <div className="timebar-mark timebar-mark-contentLoad" style={contentLoadBarStyle}></div>
                <div className="timebar-mark timebar-mark-pageLoad" style={pageLoadBarStyle}></div>
            </div>
        );
    }

    _onTimeBarClick() {

    }
};

TimeBar.defaultProps = {
    scale: null,
    start: 0,
    total: 0,
    domContentLoad: 0,
    pageLoad: 0
};

TimeBar.propTypes = {
    scale: PropTypes.func,
    start: PropTypes.number,
    total: PropTypes.number,
    domContentLoad: PropTypes.number,
    pageLoad: PropTypes.number
};