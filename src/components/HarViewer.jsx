require('fixed-data-table/dist/fixed-data-table.css');

import React from 'react';
import _ from 'lodash';
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, Input, Alert} from 'react-bootstrap';
import mimeTypes from '../core/mime-types';
import harParser from '../core/har-parser';
import HarEntryTable from './HarEntryTable.jsx';

import FixedDataTable from 'fixed-data-table';
const Table = FixedDataTable.Table;
const Column = FixedDataTable.Column;
const GutterWidth = 30;

export default class HarViewer extends React.Component {

    constructor() {
        super();

        this.state = this._initialState();
    }

    _initialState() {
        return {
            activeHar: null,
            entries: [],
            sortKey: null,
            sortDirection: null
        };
    }

    render() {
        "use strict";

        var content = this.state.activeHar
            ? this._renderViewer(this.state.activeHar)
            : this._renderEmptyViewer();

        return (
            <div>
                {this._renderHeader()}
                {content}
            </div>
        );
    }

    _renderViewer(har) {
        var pages = harParser.parse(har),
            currentPage = pages[0],
            sortedEntries = this._sortEntriesByKey(this.state.sortKey, this.state.sortDirection, currentPage.entries);

        return (
            <Grid fluid>
                <Row>
                    <Col sm={12}>
                        <HarEntryTable entries={sortedEntries}
                                       onColumnSort={this._onColumnSort.bind(this)}/>
                    </Col>
                </Row>
            </Grid>
        );
    }

    _renderHeader() {
        var buttons = _.map(_.keys(mimeTypes.types), (x) => {
            return this._createButton(x, mimeTypes.types[x].label);
        });

        var options = _.map(window.samples, (s) => {
            return (<option key={s.id} value={s.id}>{s.label}</option>);
        });

        return (
            <Grid fluid>
                <Row>
                    <Col sm={12}>
                        <PageHeader>Har Viewer</PageHeader>
                    </Col>

                    <Col sm={3} smOffset={9}>
                        <div>
                            <label className="control-label"></label>
                            <select ref="selector" className="form-control" onChange={this._sampleChanged.bind(this)}>
                                <option value="">---</option>
                                {options}
                            </select>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col sm={12}>
                        <p>Pie Chart</p>
                    </Col>
                </Row>

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
            </Grid>
        );


    }

    _renderEmptyViewer() {
        return (
            <Grid fluid>
                <Row>
                    <Col sm={12}>
                        <p></p>
                        <Alert bsStyle="warning">
                            <strong>No HAR loaded</strong>
                        </Alert>
                    </Col>
                </Row>
            </Grid>
        );
    }


    _sampleChanged() {
        var selection = this.refs.selector.getDOMNode().value;
        var har = selection
            ? _.find(window.samples, s=>s.id === selection).har
            : null;

        if (har) {
            this.setState({activeHar: har});
        }
        else {
            this.setState(this._initialState()); // reset state
        }
    }

    //-----------------------------------------
    //              Filtering
    //-----------------------------------------
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
    }


    _filterTextChanged() {

    }

    //-----------------------------------------
    //              Sorting
    //-----------------------------------------
    _onColumnSort(dataKey, direction) {
        this.setState({sortKey: dataKey, sortDirection: direction});
    }

    _sortEntriesByKey(dataKey, sortDirection, entries) {
        if (_.isEmpty(dataKey) || _.isEmpty(sortDirection)) return entries;

        var keyMap = {
            url: 'request.url',
            time: 'time.start'
        };
        var getValue = function (entry) {
            var key = keyMap[dataKey] || dataKey;
            return _.get(entry, key);
        };

        var sorted = _.sortBy(entries, getValue); // By default _.sortBy is ascending
        if (sortDirection === 'desc') {
            sorted.reverse();
        }

        return sorted;
    }

}
