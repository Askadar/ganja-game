import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import axios from 'axios';

@inject('User') @observer
class Dashboard extends Component{
	constructor(p){
		super(p);
		axios.get('/api/v1/authorized/userBlogs')
			.then(resp => p.User.blogs = resp.data.blogs)
			.catch(err => console.warn(err));
	}
	render(){
		const { User: { blogs }, children } = this.props;
		return(
			<content>
				<div className="blog-wrapper">
					{blogs.map(({ ...blog }) => <BlogCard {...blog} key={blog.name}/>)}
				</div>
				<p>{children}</p>
			</content>);

	}
}

const BlogCard = ({ avatar, name }) =>(
	<div className="box is-paddingless blog-card">
		<figure className="image is-96x96">
			<img src={avatar} alt="Image" />
		</figure>
		<div className="description">
			<span className="name">{name}</span>
			<div className="img-wrapper">
				<figure className="image is-96x96">
					<img src={avatar} alt="Image" />
				</figure>
			</div>
		</div>
		<div className="info"></div>
	</div>);

export default Dashboard;
