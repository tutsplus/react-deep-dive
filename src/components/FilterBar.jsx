import React from 'react';
import _ from 'lodash';
import {Row, Col, Button, ButtonGroup, Input} from 'react-bootstrap';
import mimeTypes from '../core/mime-types.js';

const PropTypes = React.PropTypes;

export default class FilterBar extends React.Component {

    constructor() {
        super();

        this.state = {
            type: 'all'
        };
    }

    render() {
        var buttons = _.map(_.keys(mimeTypes.types), (x) => {
            return this._createButton(x, mimeTypes.types[x].label);
        });

        return (
            <Row>
                <Col sm={8}>
                    <ButtonGroup bsSize="small">
                        {this._createButton('all', 'All')}
                        {buttons}
                    </ButtonGroup>
                </Col>

                <Col sm={4}>
                    <Input type="search"
                           placeholder="Search Url"
                           bsSize="small"
                           onChange={this._filterTextChanged.bind(this)}
                           ref="filterText"/>
                </Col>
            </Row>

        );
    }

    _createButton(type, label) {
        var handler = this._filterRequested.bind(this, type);
        return (
            <Button key={type}
                    bsStyle="primary"
                    active={this.state.type === type}
                    onClick={handler}>{label}
            </Button>
        );
    }

    _filterRequested(type, event) {
        this.setState({ type: type});

        if (this.props.onChange) {
            this.props.onChange(type);
        }
    }

    _filterTextChanged() {
        if (this.props.onFilterTextChange) {
            this.props.onFilterTextChange(this.refs.filterText.getValue());
        }
    }
}

FilterBar.defaultProps = {
    onChange: null,
    onFilterTextChange: null
};

FilterBar.propTypes = {
    onChange: PropTypes.func,
    onFilterTextChange: PropTypes.func
};

