import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Header from './Header';
import AuthorizedComp from './AuthorizedComp';

import Auth from './Auth';
import axios from 'axios';

@withRouter @inject('User') @observer
class App extends Component {
	constructor(p) {
		super(p);
		this.handleInputs = this.handleInputs.bind(this);
		this.fieldBlurred = this.fieldBlurred.bind(this);
		this.checkLogin = this.checkLogin.bind(this);
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
		this.authorize = this.authorize.bind(this);
		const username = window.sessionStorage.getItem('username');
		if (username){
			p.User.isLoggedIn = true;
			p.User.username = username;
		}
	}
	handleInputs(e){
		this.props.appState.User[e.target.name] = e.target.value;
	}
	fieldBlurred({ target: { name } }) {
		if (name === 'username')
			this.checkLogin();
	}
	checkLogin(){
		// TODO check why passport or smth redirects to GET via 302 (303?)
		// const {username} = this.props.appState.User;
		// axios.post('/login', { username })
		// 	.then(a => console.log(a))
		// 	.catch(a => console.warn(a))
	}
	authorize(response) {
		const { User } = this.props;
		if (response.data.message !== 'success')
			return console.error(response);
		User.isLoggedIn = true;
		window.sessionStorage.setItem('username', User.username);
	}
	login(){
		const { username, password } = this.props.User;
		console.log('loginingin');
		axios.post(this.props.apiPath + '/auth/login', { username, password, ajax: true } )
			.then(this.authorize)
			.catch(a => console.warn(a));
	}
	register(){
		const { username, password } = this.props.User;
		console.log('registering');
		axios.post(this.props.apiPath + '/auth/register', { username, password, ajax: true } )
			.then(this.authorize)
			.catch(a => console.warn(a));
	}
	render() {
		const { User } = this.props;
		const authHandlers = { usernameBlurred: this.fieldBlurred, passwordBlurred: this.fieldBlurred, login: this.login, register: this.register };
		return (
			<div>
				<DevTools />
				<Header isLoggedIn={User.isLoggedIn} User={User} unlogdemohandle={() => {axios.get(this.props.apiPath + '/auth/logout?ajax=true'), sessionStorage.clear();} }/>
				<Switch>
					<Route path="/auth" render={() =>
						User.isLoggedIn ?
							<Redirect from="/auth" to="/authorized" /> :
							<Auth User={User} handlers={authHandlers}/>}
					/>

					<Route path="/authorized" render={() =>
						User.isLoggedIn ?
							<AuthorizedComp/> :
							<Redirect to="/auth"/> }
					/>

					<Route path="/" render={() => <div>Da landing stuff, kinda</div>}/>
				</Switch>
					User is {User.isLoggedIn ? ' authorized' : 'anonimized'}
			</div>
		);
	}
}

export default App;
