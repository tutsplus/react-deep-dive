export default class Page {
    constructor(harPage) {
        "use strict";

        this.id = harPage.id;
        this.startedDateTime = harPage.startedDateTime;
        this.pageTimings = _.clone(harPage.pageTimings);
        this.entries = [];
    }
}
