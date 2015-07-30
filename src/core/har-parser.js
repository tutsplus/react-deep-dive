var _ = require('lodash');

import Page from './Page.js'
import Entry from './Entry.js'

export default {

    parse: parse
};

function parse(har) {
    "use strict";

    var pageMap = {},
        pages = [];

    _.each(har.log.pages, function (p) {
        var page = new Page(p);
        pageMap[p.id] = page;
        pages.push(page);
    });

    _.each(har.log.entries, function (p) {
        var page = pageMap[p.pageref],
            entry = new Entry(p, page);

        page.entries.push(entry);
    });

    return pages;
}

