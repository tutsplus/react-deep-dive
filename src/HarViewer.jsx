import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import _ from 'lodash';

import harParser from './core/har-parser.js'
import sampleHar from './stackoverflow.com.json'

import PageList from './PageList.jsx';
import HarEntryList from './HarEntryList.jsx';
import FilterBar from './FilterBar.jsx';

export default class HarViewer extends React.Component {

    constructor() {
        super();
        this.state = {
            filterType: 'all',
            sortKey: null,
            sortDirection: null
        };
    }

    render() {
        "use strict";

        var pages = harParser.parse(sampleHar),
            filteredEntries = this._filterEntriesByType(this.state.filterType, pages[0].entries),
            sortedEntries = this._sortEntriesByKey(this.state.sortKey, this.state.sortDirection, filteredEntries);

        return (
            <Grid>
                <Row>
                    <Col sm={12}>
                        <h1>Har Analyzer</h1>
                        <PageList pages={pages}/>
                        <FilterBar onChange={this._onFilterChanged.bind(this)}/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <HarEntryList entries={sortedEntries}
                                      onColumnSort={this._onColumnSort.bind(this)}/>
                    </Col>
                </Row>
            </Grid>
        );
    }

    _onColumnSort(dataKey, direction) {
        this.setState({sortKey: dataKey, sortDirection: direction});
    }

    _sortEntriesByKey(dataKey, sortDirection, entries) {
        if (_.isEmpty(dataKey) || _.isEmpty(sortDirection)) return entries;

        var keyMap = {
            url: 'request.url'
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

    _onFilterChanged(type) {
        this.setState({filterType: type});
    }

    _filterEntriesByType(type, entries) {
        if (type === 'all') return entries;

        return _.filter(entries, function (x) {
            return x.type === type;
        });
    }

};