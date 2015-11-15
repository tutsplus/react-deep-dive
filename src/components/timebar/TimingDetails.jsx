import React from 'react';
import formatter from '../../core/formatter';

export default class TimingDetails extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        var {blocked, connect, dns, wait, send, receive} = this.props.timings;

        return (
            <table className="table table-condensed timing-details">
                <tr className="bg-danger">
                    <td><strong>Start</strong></td>
                    <td>{formatter.time(this.props.start)}</td>
                </tr>
                <tr className="timing-group">
                    <td><small>Blocked</small></td>
                    <td>{formatter.time(blocked)}</td>
                </tr>
                <tr className="timing-group">
                    <td><small>DNS</small></td>
                    <td>{formatter.time(dns)}</td>
                </tr>
                <tr className="timing-group">
                    <td><small>Connect</small></td>
                    <td>{formatter.time(connect)}</td>
                </tr>
                <tr className="timing-group-start">
                    <td><small>Sent</small></td>
                    <td>{formatter.time(send)}</td>
                </tr>
                <tr className="timing-group">
                    <td><small>Wait</small></td>
                    <td>{formatter.time(wait)}</td>
                </tr>
                <tr className="timing-group">
                    <td><small>Receive</small></td>
                    <td>{formatter.time(receive)}</td>
                </tr>
                <tr className="bg-success">
                    <td><strong>Total</strong></td>
                    <td>{formatter.time(this.props.total)}</td>
                </tr>
            </table>
        );
    }

};

TimingDetails.defaultProps = {
    timings: null,
    start: 0,
    total: 0
};