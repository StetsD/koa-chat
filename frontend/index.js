import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {syncHistoryWithStore} from 'react-router-redux';
import {Router, Route, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import Routes from './routes';
import store from './store';
import jquery from 'jquery';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {Routes}
        </Router>
    </Provider>,
    document.getElementById('app')
);
