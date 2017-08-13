import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

export default class Header extends Component {
	shouldComponentUpdate(p){
		return this.props.isLoggedIn !== p.isLoggedIn;
	}
	render(){
		const { isLoggedIn, User, unlogdemohandle } = this.props;
		return(
			<header>
				{ isLoggedIn ?
					<nav className="level">
						<li className="level-item">
							<Link activeClassName="active" to="/authorized/profile">Profile</Link>
						</li>
						<li className="level-item">
							<Link activeClassName="active" to="/authorized">Dashboardy</Link>
						</li>
						<li className="level-item" onClick={() =>{ User.isLoggedIn = false; unlogdemohandle();}}>
							<Link activeClassName="active" to="/auth">Remove logged in as {User.username}</Link>
						</li>
					</nav>
					:
					<nav className="level">
						<div className="level-item is-large has-text-centered">
							sTumblr
						</div>
					</nav>
				}
			</header>
		);
	}
}
