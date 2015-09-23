require('./_har-entry-table.scss');

import React from 'react';
import _ from 'lodash';
import {Grid, Row, Col} from 'react-bootstrap';

import FixedDataTable from 'fixed-data-table';
const Table = FixedDataTable.Table;
const Column = FixedDataTable.Column;
const GutterWidth = 30;

const PropTypes = React.PropTypes;

export default class HarEntryTable extends React.Component {

    constructor() {
        super();

        this.state = {
            isColumnResizing: false,
            columnWidths: {
                url: 500,
                size: 100,
                time: 200
            },
            sortDirection: {
                url: null,
                size: null,
                time: null
            },
            tableWidth: 1000,
            tableHeight: 500
        };
    }

    render() {

        return (
            <Table ref="entriesTable"
                   rowsCount={this.props.entries.length}
                   width={this.state.tableWidth}
                   headerHeight={30}
                   height={this.state.tableHeight}
                   rowHeight={30}
                   rowGetter={this._getEntry.bind(this)}
                   isColumnResizing={this.state.isColumnResizing}
                   onColumnResizeEndCallback={this._onColumnResized.bind(this)}>
                <Column dataKey="url"
                        width={this.state.columnWidths.url}
                        isResizable={true}
                        headerRenderer={this._renderHeader.bind(this)}
                        cellDataGetter={this._readKey.bind(this)}
                        label="Url"
                        flexGrow={null}/>
                <Column dataKey="size"
                        width={this.state.columnWidths.size}
                        headerRenderer={this._renderHeader.bind(this)}
                        isResizable={true}
                        label="Size"/>
                <Column dataKey="time"
                        width={this.state.columnWidths.time}
                        minWidth={200}
                        isResizable={true}
                        headerRenderer={this._renderHeader.bind(this)}
                        cellDataGetter={this._readKey.bind(this)}
                        label="Timeline"/>
            </Table>
        );
    }

    _readKey(key, entry) {
        var keyMap = {
            url: 'request.url',
            time: 'time.start'
        };

        key = keyMap[key] || key;
        return _.get(entry, key);
    }

    _getEntry(index) {
        return this.props.entries[index];
    }

    _onColumnResized(newColumnWidth, dataKey) {
        var columnWidths = this.state.columnWidths;
        columnWidths[dataKey] = newColumnWidth;

        this.setState({columnWidths: columnWidths, isColumnResizing: false});
    }

    //-----------------------------------------
    //              Table Resizing
    //-----------------------------------------
    componentDidMount() {

        window.addEventListener('resize', _.debounce(this._onResize.bind(this), 50, {leading: true, trailing: true}));
        _.delay(this._onResize.bind(this), 50);
    }

    _onResize() {
        var parent = this.refs.entriesTable.getDOMNode().parentNode;

        this.setState({
            tableWidth: parent.clientWidth - GutterWidth,
            tableHeight: document.body.clientHeight - parent.offsetTop - GutterWidth * 0.5
        });
    }

    //-----------------------------------------
    //              Table Sorting
    //-----------------------------------------
    _renderHeader(label, dataKey) {
        var dir = this.state.sortDirection[dataKey],
            classMap = {
                asc: 'glyphicon glyphicon-sort-by-attributes',
                desc: 'glyphicon glyphicon-sort-by-attributes-alt'
            },
            sortClass = dir ? classMap[dir] : '';

        return (
            <div className="text-primary sortable"
                 onClick={this._columnClicked.bind(this, dataKey)}>
                <strong>{label}</strong>
                &nbsp;
                <i className={sortClass}></i>
            </div>
        );
    }

    _columnClicked(dataKey) {
        var sortDirections = this.state.sortDirection;
        var dir = sortDirections[dataKey];

        if (dir === null) {dir = 'asc'; }
        else if (dir === 'asc') {dir = 'desc'; }
        else if (dir === 'desc') {dir = null; }

        // Reset all sorts
        _.each(_.keys(sortDirections), function (x) {
            sortDirections[x] = null;
        });

        sortDirections[dataKey] = dir;

        if (this.props.onColumnSort) {
            this.props.onColumnSort(dataKey, dir);
        }
    }
}

HarEntryTable.defaultProps = {
    entries: [],
    onColumnSort: null
};
HarEntryTable.propTypes = {
    entries: PropTypes.array,
    onColumnSort: PropTypes.func
};
