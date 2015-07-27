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
            filterType: 'all'
        };
    }

    render() {
        "use strict";

        var pages = harParser.parse(sampleHar),
            filteredEntries = this._filterEntriesByType(pages[0].entries, this.state.filterType);

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
                        <HarEntryList entries={filteredEntries}/>
                    </Col>
                </Row>
            </Grid>
        );
    }

    _onFilterChanged(type) {
        this.setState({filterType: type});
    }

    _filterEntriesByType(entries, type) {
        if (type === 'all') return entries;

        return _.filter(entries, function (x) {
            return x.type === type;
        });
    }

};