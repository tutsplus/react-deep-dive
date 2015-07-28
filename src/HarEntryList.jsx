require('fixed-data-table/dist/fixed-data-table.css');

import _ from 'lodash';
import React from 'react';
import FixedDataTable from 'fixed-data-table';

const Table = FixedDataTable.Table;
const Column = FixedDataTable.Column;
const GutterWidth = 30;
const PropTypes = React.PropTypes;

export default class HarEntryList extends React.Component {

    constructor() {
        super();

        this.state = {
            columnWidths: {
                url: 500,
                type: 100,
                size: 100
            },
            sortDirection: {
                url: null,
                type: null,
                size: null
            },
            tableWidth: 1000,
            isColumnResizing: false
        };
    }

    render() {

        return (
            <Table rowsCount={this.props.entries.length}
                   width={this.state.tableWidth}
                   headerHeight={30}
                   height={500}
                   rowHeight={30}
                   rowGetter={this._getEntry.bind(this)}
                   isColumnResizing={this.state.isColumnResizing}
                   onColumnResizeEndCallback={this._onColumnResized.bind(this)}>
                <Column dataKey="url"
                        headerRenderer={this._renderHeader.bind(this)}
                        cellDataGetter={this._readKey.bind(this)}
                        width={this.state.columnWidths.url}
                        label="Url"
                        isResizable={true}
                        flexGrow={null}/>
                <Column dataKey="type"
                        headerRenderer={this._renderHeader.bind(this)}
                        width={this.state.columnWidths.type}
                        label="Type"
                        isResizable={true}/>
                <Column dataKey="size"
                        headerRenderer={this._renderHeader.bind(this)}
                        width={this.state.columnWidths.size}
                        label="Size"
                        isResizable={true}/>
            </Table>
        );
    }

    _readKey(key, entry) {
        var keyMap = {
            url: 'request.url'
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
            <div>
                <a onClick={this._columnClicked.bind(this, dataKey)}>{label}</a>
                &nbsp;
                <i className={'text-primary ' + sortClass}></i>
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
        _.each(_.keys(sortDirections), function(x){
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
        this._updateSizeTimer = setTimeout(this._updateSize.bind(this), 16);
    }

    _updateSize() {
        var parent = React.findDOMNode(this).parentNode;

        this.setState({tableWidth: parent.clientWidth - GutterWidth});
    }

};

HarEntryList.defaultProps = {
    entries: [],
    onColumnSort: null
};

HarEntryList.propTypes = {
    entries: PropTypes.array,
    onColumnSort: PropTypes.func
};
