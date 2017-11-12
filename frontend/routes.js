import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './App';

import {LoginRoute} from './components/pages';
import {RegRoute} from './components/pages';

export default(
	<Route path={App.path} component={App}>
		{LoginRoute}
		{RegRoute}
	</Route>
)
