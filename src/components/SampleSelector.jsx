import React from 'react';
import HarActions from '../store/HarActions';

const PropTypes = React.PropTypes;

export default class SampleSelector extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        var samples = _.map(window.samples, (s)=> {
            return (<option value={s.id} key={s.id}>{s.label}</option>);
        });

        return (
            <div>
                <label className="control-label">HAR File</label>
                <select ref="selector" className="form-control" onChange={this._sampleChanged.bind(this)}>
                    {samples}
                </select>
            </div>
        );
    }

    _sampleChanged() {
        var type = this.refs.selector.getDOMNode().value,
            har = _.find(window.samples, (x)=>x.id === type).har;

        if (this.props.onSampleChanged) {
            this.props.onSampleChanged(har);
        }
    }
};

SampleSelector.propTypes = {
    onSampleChanged: PropTypes.func
};
SampleSelector.defaultProps = {
    onSampleChanged: null
};