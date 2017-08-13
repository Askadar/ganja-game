import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import { Link } from 'react-router-dom';

@observer
class Auth extends Component {
	render() {
		const { User, handlers } = this.props;
		const { username, password } = User;
		return (
			<content>
				<div className="card signin">
					<header className="card-header has-text-centered">
						<p className="card-header-title">Sign In</p>
					</header>
					<div className="card-content">
						<div className="field">
							<p className="control has-icons-left">
								<input onChange={e => User.username = e.target.value} onBlur={handlers.usernameBlurred} className="input" type="email" placeholder="Email" name="username" value={username}/>
								<span className="icon is-small is-left">
									<i className="fa fa-envelope"></i>
								</span>
							</p>
						</div>
						<div className="field">
							<p className="control has-icons-left">
								<input onChange={e => User.password = e.target.value} onBlur={handlers.passwordBlurred} className="input" type="password" placeholder="Password" name="password" value={password}/>
								<span className="icon is-small is-left">
									<i className="fa fa-lock"></i>
								</span>
							</p>
						</div>
					</div>
					<footer className="card-footer">
						<a className="card-footer-item" onClick={handlers.login}>
				sign in
						</a>
						<a className="card-footer-item" onClick={handlers.register}>
				register
						</a>
					</footer>
				</div>
			</content>
		);
	}
}

export default Auth;
