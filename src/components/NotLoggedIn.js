import React, { useEffect } from 'react'
import Login from './Login'
import SignUp from './SignUp'

//import blogService from './services/blogs'

import {
	Switch, Route, Redirect
} from "react-router-dom"
const NotLoggedIn = () => {



	return (
		<Switch>
			<Redirect exact from="/" to="/login" />
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/signup">
				<SignUp />
			</Route>
			{/*<Route path="/blogs">
				<Bloglist />
			</Route>
			<Route path="/users/:id">
				<User user={user} />
			</Route>
			<Route path="/users">
				<Userlist />
			</Route>*/}
		</Switch>
	)
}

export default NotLoggedIn