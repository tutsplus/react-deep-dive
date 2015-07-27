import mimeTypes from './mime-types.js';

export class Page {
    constructor(harPage) {
        "use strict";

        this.id = harPage.id;
        this.startedDateTime = harPage.startedDateTime;
        this.pageTimings = _.clone(harPage.pageTimings);
        this.entries = [];
    }
}

export class Entry {

    constructor(harEntry, page) {
        "use strict";

        this.startTime = new Date(harEntry.startedDateTime) - new Date(page.startedDateTime);

        // Destructuring to the rescue
        var {
            time,
            request: {url, method},
            response: {
                content: {size, mimeType}
                }
            } = harEntry;

        this.request = { url: url, method: method };
        this.time = time;
        this.size = size;
        this.type = mimeTypes.identify(mimeType);

    }
}



