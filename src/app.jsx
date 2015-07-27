require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/css/bootstrap-theme.css');

require('./app.scss');

import HarViewer from './HarViewer.jsx';
import React from 'react';

React.render(
    <HarViewer />,
    document.body
);
