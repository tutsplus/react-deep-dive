require('./_timebar.scss');

import React from 'react';
import formatter from '../../core/formatter';
import {OverlayTrigger, Popover} from 'react-bootstrap'
import TimingDetails from './TimingDetails.jsx';

const PropTypes = React.PropTypes;

export default class TimeBar extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        var value = (value)=> {
                return `${this.props.scale(value)}%`;
            },
            bars = [
                {
                    type: 'time',
                    style: {
                        left: value(this.props.start),
                        width: value(this.props.total)
                    },
                    className: 'timebar-mark-time'
                },
                {
                    type: 'contentLoad',
                    style: {
                        left: value(this.props.domContentLoad),
                        width: 1
                    },
                    className: 'timebar-mark-contentLoad'
                },
                {
                    type: 'pageLoad',
                    style: {
                        left: value(this.props.pageLoad),
                        width: 1
                    },
                    className: 'timebar-mark-pageLoad'
                }
            ],
            label = formatter.time(this.props.total);


        var barElements = _.chain(bars)
            .map(function (b) {
                return (<div key={b.type} className={`timebar-mark ${b.className}`} style={b.style}></div>);
            })
            .value();

        var overlay = (
            <Popover title={`Timing Details, started at: ${formatter.time(this.props.start)}`}>
                <TimingDetails timings={this.props.timings}
                               start={this.props.start}
                               total={this.props.total}/>
            </Popover>
        );


        return (
            <OverlayTrigger trigger={['hover', 'focus']}
                            placement="left"
                            delay={0}
                            overlay={overlay}>
                <div className="timebar">
                    {barElements}
                    <span className="timebar-label">{label}</span>
                </div>
            </OverlayTrigger>
        );
    }

};

TimeBar.defaultProps = {
    scale: null,
    start: 0,
    total: 0,
    timings: null,
    domContentLoad: 0,
    pageLoad: 0
};

TimeBar.propTypes = {
    scale: PropTypes.func,
    start: PropTypes.number,
    total: PropTypes.number,
    timings: PropTypes.object,
    domContentLoad: PropTypes.number,
    pageLoad: PropTypes.number
};