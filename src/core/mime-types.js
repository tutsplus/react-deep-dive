var types = {
    image: {
        label: 'Image',
        mime: [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/bmp',
            'image/svg+xml'
        ]
    },
    json: {
        label: 'XHR',
        mime: [
            'application/json'
        ]
    },
    html: {
        label: 'Document',
        mime: [
            'text/html'
        ]
    },
    js: {
        label: 'Script',
        mime: [
            'application/javascript',
            'text/javascript'
        ]
    },
    css: {
        label: 'Stylesheet',
        mime: [
            'text/css'
        ]
    },
    font: {
        label: 'Font',
        mime: [
            'application/font-woff',
            'application/font-ttf',
            'application/vnd.ms-fontobject',
            'application/font-otf'
        ]
    },
    other: {
        label: 'Other',
        mime: []
    }
};


export default {
    types: types,
    identify: identify
};

function identify(mimeType) {
    "use strict";

    var fileType = _.find(_.keys(types), function (type) {
        return _.includes(types[type].mime, mimeType);
    });

    return fileType || 'other';
}
