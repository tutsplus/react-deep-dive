require('fixed-data-table/dist/fixed-data-table.css');
require('./_har-entry-table.scss');

import _ from 'lodash';
import React from 'react';
import FixedDataTable from 'fixed-data-table';
import TimeBar from '../timebar/TimeBar.jsx';
import FileType from '../file-type/FileType.jsx';
import formatter from '../../core/formatter';
import {OverlayTrigger, Popover, Tooltip, Button} from 'react-bootstrap';

const Table = FixedDataTable.Table;
const Column = FixedDataTable.Column;
const GutterWidth = 30;
const PropTypes = React.PropTypes;

export default class HarEntryTable extends React.Component {

    constructor() {
        super();

        this.state = {
            highlightRow: -1,
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
            tableHeight: 500,
            isColumnResizing: false
        };
    }

    render() {

        return (
            <Table rowsCount={this.props.entries.length}
                   width={this.state.tableWidth}
                   headerHeight={30}
                   height={this.state.tableHeight}
                   rowHeight={30}
                   rowGetter={this._getEntry.bind(this)}
                   rowClassNameGetter={this._getRowClasses.bind(this)}
                   isColumnResizing={this.state.isColumnResizing}
                   onColumnResizeEndCallback={this._onColumnResized.bind(this)}>
                <Column dataKey="url"
                        cellRenderer={this._renderUrlColumn.bind(this)}
                        headerRenderer={this._renderHeader.bind(this)}
                        cellDataGetter={this._readKey.bind(this)}
                        width={this.state.columnWidths.url}
                        label="Url"
                        isResizable={true}
                        flexGrow={null}/>
                <Column dataKey="size"
                        headerRenderer={this._renderHeader.bind(this)}
                        cellRenderer={this._renderSizeColumn.bind(this)}
                        width={this.state.columnWidths.size}
                        minWidth={200}
                        label="Size"
                        isResizable={true}/>
                <Column dataKey="time"
                        headerRenderer={this._renderHeader.bind(this)}
                        cellRenderer={this._renderTimeColumn.bind(this)}
                        width={this.state.columnWidths.time}
                        minWidth={200}
                        label="Timeline"
                        isResizable={true}/>
            </Table>
        );
    }

    _getRowClasses(index) {
        var classname = (index === this.state.highlightRow) ? 'active' : '';

        return classname;
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


    _renderSizeColumn(cellData, cellDataKey, rowData, rowIndex, columnData, width) {
        return (<span>{formatter.fileSize(cellData)}</span>);
    }

    _renderUrlColumn(cellData, cellDataKey, rowData, rowIndex, columnData, width) {
        return (<FileType url={rowData.request.url} type={rowData.type}/>);
    }

    _renderTimeColumn(cellData, cellDataKey, rowData, rowIndex, columnData, width) {
        var start = rowData.time.start,
            total = rowData.time.total,
            pgTimings = this.props.page.pageTimings;

        return (
            <TimeBar scale={this.props.timeScale}
                     start={start}
                     total={total}
                     timings={rowData.time.details}
                     domContentLoad={pgTimings.onContentLoad}
                     pageLoad={pgTimings.onLoad}
            />
        );
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
            tableHeight: document.body.clientHeight - parent.offsetTop - GutterWidth*0.5
        });
    }

};

HarEntryTable.defaultProps = {
    entries: [],
    page: null,
    onColumnSort: null,
    timeScale: null
};

HarEntryTable.propTypes = {
    entries: PropTypes.array,
    page: PropTypes.object,
    onColumnSort: PropTypes.func,
    timeScale: PropTypes.func
};
