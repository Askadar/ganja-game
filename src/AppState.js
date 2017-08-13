import { observable } from 'mobx';

class AppState {
		@observable User = {
			username: '',
			password: '',
			isLoggedIn: false,
			blogs: []
		};
		// TODO: decide what to do with blogs stores
		// @observable Blogs = [
		// ]

		@observable FollowedBlogs = [

		]

}

export default AppState;
