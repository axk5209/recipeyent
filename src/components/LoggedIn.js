import React, { useEffect } from 'react'
import Login from './Login'
import SignUp from './SignUp'
import MainDisplay from './MainDisplay'
import RecipePage from './RecipePage'
import UserPage from './UserPage'

//import recipeService from './services/recipes'

import {
	Switch, Route, Redirect
} from "react-router-dom"
import Dashboard from './Dashboard'
import CreateRecipeForm from './CreateRecipeForm'
const LoggedIn = () => {



	return (
		<Switch>
			<Route path="/dashboard">
				<Dashboard />
			</Route>
			<Route path="/main">
				<MainDisplay />
			</Route>
			<Route path="/recipes/:id">
				<RecipePage />
			</Route>
			<Route path="/users/:id">
				<UserPage />
			</Route>
			<Route path="/create">
				<CreateRecipeForm />
			</Route>
			<Redirect from="/" to="/main" />
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

export default LoggedIn