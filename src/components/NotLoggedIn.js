import React, { useEffect } from 'react'
import Login from './Login'
import SignUp from './SignUp'
import LandingPage from './LandingPage'
//import recipeService from './services/recipes'

import {
	Switch, Route, Redirect
} from "react-router-dom"
const NotLoggedIn = () => {



	return (
		<Switch>
			<Redirect exact from="/" to="/home" />
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/signup">
				<SignUp />
			</Route>
			<Route path="/home">
				<LandingPage />
			</Route>
			{/*<Route path="/recipes">
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