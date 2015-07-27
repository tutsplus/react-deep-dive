require('fixed-data-table/dist/fixed-data-table.css');

import _ from 'lodash';
import React from 'react';
import FixedDataTable from 'fixed-data-table';

const Table = FixedDataTable.Table;
const Column = FixedDataTable.Column;
const GutterWidth = 30;

export default class HarEntryList extends React.Component {

    constructor() {
        super();

        this.state = {
            columnWidths: {
                url: 500,
                type: 100,
                size: 100
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
                        cellDataGetter={this._readKey.bind(this)}
                        width={this.state.columnWidths.url}
                        label="Url"
                        isResizable={true}
                        flexGrow={null}/>
                <Column dataKey="type"
                        width={this.state.columnWidths.type}
                        label="Type"
                        isResizable={true}/>
                <Column dataKey="size"
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
    entries: []
};
