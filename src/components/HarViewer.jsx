require('fixed-data-table/dist/fixed-data-table.css');

import React from 'react';
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, Input} from 'react-bootstrap';
import mimeTypes from '../core/mime-types';
import _ from 'lodash';

import FixedDataTable from 'fixed-data-table';
const Table = FixedDataTable.Table;
const Column = FixedDataTable.Column;
const PropTypes = React.PropTypes;
const GutterWidth = 30;

export default class HarViewer extends React.Component {

    constructor() {
        super();
        this.state = {
            columnWidths: {
                url: 500,
                size: 100,
                time: 200
            },
            tableWidth: 1000,
            tableHeight: 500
        };
    }

    render() {
        var buttons = _.map(_.keys(mimeTypes.types), (x)=> {
            return this._createButton(x, mimeTypes.types[x].label);
        });

        return (
            <Grid fluid>
                <Row>
                    <Col sm={12}>
                        <PageHeader>Har Viewer</PageHeader>
                    </Col>

                    <Col sm={3} smOffset={9}>
                        <div>
                            <label className="control-label">HAR File</label>
                            <select ref="selector" className="form-control" onChange={this._sampleChanged.bind(this)}>
                                <option value="">---</option>
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

                <Row>
                    <Col sm={12}>
                        <Table rowsCount={this.props.entries.length}
                               width={this.state.tableWidth}
                               headerHeight={30}
                               height={this.state.tableHeight}
                               rowHeight={30}
                               rowGetter={this._getEntry.bind(this)}>
                            <Column dataKey="url"
                                    width={this.state.columnWidths.url}
                                    label="Url"
                                    isResizable={true}
                                    flexGrow={null}/>
                            <Column dataKey="size"
                                    width={this.state.columnWidths.size}
                                    minWidth={200}
                                    label="Size"
                                    isResizable={true}/>
                            <Column dataKey="time"
                                    width={this.state.columnWidths.time}
                                    minWidth={200}
                                    label="Timeline"
                                    isResizable={true}/>
                        </Table>
                    </Col>
                </Row>
            </Grid>
        );
    }

    _sampleChanged() {

    }

    _getEntry(index) {
        return this.props.entries[index];
    }

    //-----------------------------------------
    //              Filtering
    //-----------------------------------------
    _filterTextChanged() {
        if (this.props.onFilterTextChange) {
            this.props.onFilterTextChange(this.refs.filterText.getValue());
        }
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
        this.setState({type: type});
        if (this.props.onChange) {
            this.props.onChange(type);
        }
    }

    //-----------------------------------------
    //              Table Resizing
    //-----------------------------------------
    componentDidMount() {

        window.addEventListener('resize', this._onResize.bind(this));
        this._onResize();
    }

    _onResize() {
        clearTimeout(this._updateSizeTimer);
        this._updateSizeTimer = setTimeout(this._updateSize.bind(this), 50);
    }

    _updateSize() {
        var parent = React.findDOMNode(this).parentNode;

        this.setState({
            tableWidth: parent.clientWidth - GutterWidth,
            tableHeight: document.body.clientHeight - parent.offsetTop - GutterWidth * 0.5
        });
    }
};

HarViewer.defaultProps = {
    entries: [],
    onChange: null,
    onFilterTextChange: null
};