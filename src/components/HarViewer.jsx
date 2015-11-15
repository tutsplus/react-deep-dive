import React from 'react';
import _ from 'lodash';
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, Input, Alert} from 'react-bootstrap';
import mimeTypes from '../core/mime-types.js';
import HarEntryTable from './har-entry-table/HarEntryTable.jsx';
import FilterBar from './FilterBar.jsx';
import SampleSelector from './SampleSelector.jsx';

import harParser from '../core/har-parser.js';

export default class HarViewer extends React.Component {

    constructor() {
        super();

        this.state = this._initialState();
    }

    _initialState() {
        return {
            activeHar: null,
            filterType: 'all',
            filterText: null,
            sortKey: null,
            sortDirection: null
        };
    }

    render() {

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

    _renderViewer(har) {
        var pages = harParser.parse(har),
            currentPage = pages[0];

        var filter = {
                type: this.state.filterType,
                text: this.state.filterText
            },
            filteredEntries = this._filterEntries(filter, currentPage.entries),
            entries = this._sortEntriesByKey(this.state.sortKey, this.state.sortDirection, filteredEntries);

        return (
            <Grid fluid>
                <FilterBar onChange={this._onFilterChanged.bind(this)}
                           onFilterTextChange={this._onFilterTextChanged.bind(this)}>
                </FilterBar>

                <Row>
                    <Col sm={12}>
                        <HarEntryTable entries={entries}
                                       page={currentPage}
                                       onColumnSort={this._onColumnSort.bind(this)}/>
                    </Col>
                </Row>

            </Grid>
        );
    }

    _renderHeader() {
        return (
            <Grid fluid>
                <Row>
                    <Col sm={12}>
                        <PageHeader>Har Viewer</PageHeader>
                    </Col>

                    <Col sm={3} smOffset={9}>
                        <SampleSelector onSampleChanged={this._sampleChanged.bind(this)}></SampleSelector>
                    </Col>
                </Row>

                <Row>
                    <Col sm={12}>
                        <p>Pie Chart</p>
                    </Col>
                </Row>

            </Grid>
        );
    }

    _sampleChanged(har) {
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
    _onFilterChanged(type) {
        this.setState({filterType: type});
    }

    _onFilterTextChanged(text) {
        this.setState({filterText: text});
    }

    _filterEntries(filter, entries) {
        return _.filter(entries, function (x) {
            var matchesType = filter.type === 'all' || filter.type === x.type,
                matchesText = _.includes(x.request.url, filter.text || '');

            return matchesType && matchesText;
        });
    }

    //-----------------------------------------
    //              Sorting
    //-----------------------------------------
    _onColumnSort(dataKey, direction) {
        this.setState({sortKey: dataKey, sortDirection: direction});
    }

    _sortEntriesByKey(sortKey, sortDirection, entries) {
        if (_.isEmpty(sortKey) | _.isEmpty(sortDirection)) return entries;

        var keyMap = {
                url: 'request.url',
                time: 'time.start'
            },
            getValue = function (entry) {
                var key = keyMap[sortKey] || sortKey;
                return _.get(entry, key);
            };

        var sorted = _.sortBy(entries, getValue);
        if (sortDirection === 'desc') {
            sorted.reverse();
        }

        return sorted;
    }

}

HarViewer.defaultProps = {};