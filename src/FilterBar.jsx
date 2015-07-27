import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import _ from 'lodash';

import mimeTypes from './core/mime-types.js';

export default class FilterBar extends React.Component {

    constructor() {
        super();
        this.state = {
            type: 'all'
        };
    }

    render() {
        var buttons = _.map(_.keys(mimeTypes.types), (x)=> {
            return this._createButton(x, mimeTypes.types[x].label);
        });
        return (
            <ButtonGroup bsSize="xsmall">
                {this._createButton('all', 'All')}
                {buttons}
            </ButtonGroup>
        );
    }

    _createButton(type, label) {
        var handler = this._filterRequested.bind(this, type);
        return (<Button key={type} active={this.state.type === type} onClick={handler}>{label}</Button>);
    }

    _filterRequested(type, event) {
        this.setState({type: type});
        if (this.props.onChange) {
            this.props.onChange(type);
        }
    }
};

FilterBar.defaultProps = {
    onChange: null
};