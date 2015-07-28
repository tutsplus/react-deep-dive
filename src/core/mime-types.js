var types = {
    json: {
        label: 'XHR',
        mime: [
            'application/json'
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
        label: 'Style',
        mime: [
            'text/css'
        ]
    },
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
    font: {
        label: 'Font',
        mime: [
            'application/font-woff',
            'application/font-ttf',
            'application/vnd.ms-fontobject',
            'application/font-otf'
        ]
    },
    html: {
        label: 'Document',
        mime: [
            'text/html'
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
