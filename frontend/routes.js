import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './App';

import {LoginRoute, RegRoute, ChatRoute} from './components/pages';

export default(
	<Route path={App.path} component={App}>
		{LoginRoute}
		{RegRoute}
		{ChatRoute}
	</Route>
)
