var types = {
    json: {
        label: 'XHR',
        color: '#558f99',
        mime: [
            'application/json'
        ]
    },
    js: {
        label: 'Script',
        color: '#99993b',
        mime: [
            'application/javascript',
            'text/javascript'
        ]
    },
    css: {
        label: 'Style',
        color: '#6b9979',
        mime: [
            'text/css'
        ]
    },
    image: {
        label: 'Image',
        color: '#866399',
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
        color: '#799958',
        mime: [
            'application/font-woff',
            'application/font-ttf',
            'application/vnd.ms-fontobject',
            'application/font-otf'
        ]
    },
    html: {
        label: 'Document',
        color: '#456499',
        mime: [
            'text/html'
        ]
    },
    other: {
        label: 'Other',
        color: '#999999',
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