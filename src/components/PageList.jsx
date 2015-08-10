import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';

export default class PageList extends React.Component {

    render() {
        "use strict";

        var items = this.props.pages.map(function(page){
            return (<Button key={page.id}>{page.id}</Button>);
        });

        return (
            <ButtonToolbar className="page-list">
                {items}
            </ButtonToolbar>
        );
    }

}

PageList.defaultProps = {
    pages: []
};

