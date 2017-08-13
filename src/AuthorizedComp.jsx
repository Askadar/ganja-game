import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

const AuthorizedComp = () =>
	<div>
	Some text for AuComp
		<Switch>
			<Route path="/authorized/profile" render={
				() => <a href="/auth/start" target="_blank">Register yourself as tumblerite here!</a>
			}/>
			<Route path="/authorized/" render={() => <Dashboard>Dashboarded!</Dashboard>}/>
		</Switch>
	</div>;

export default AuthorizedComp;
