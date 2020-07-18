import React, { useEffect } from 'react'
//import recipeService from './services/recipes'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUserAction } from "./reducers/currentUser"
import MainDisplay from "./components/MainDisplay"
import LoggedIn from "./components/LoggedIn"

import {
	BrowserRouter as Router,
} from "react-router-dom"
import NotLoggedIn from './components/NotLoggedIn'
import { initializeRecipesAction } from './reducers/recipes'
import { initializeUsersAction } from './reducers/users'
import recipeService from './services/recipes';


const App = () => {

	const dispatch = useDispatch()
	const user = useSelector(state => {
		//console.log("Change detected")
		//console.log(state)
		//return state.user
		return state.currentUser
	})


	useEffect(() => {
		async function initializeEverything()
		{
			const currentUserJSON = window.localStorage.getItem('currentUser')
			const currentUser = JSON.parse(currentUserJSON)
			if (currentUser !== null) {
				dispatch(setCurrentUserAction(currentUser))
				recipeService.setToken(currentUser.token)
			}
			await dispatch(initializeRecipesAction())
			await dispatch(initializeUsersAction())
		}
		initializeEverything()
		// eslint-disable-next-line
	}, [])//when page first loads



	return (
		<Router>
			{!user && <NotLoggedIn />} 
			{user && <LoggedIn />} {/*No matter what is put after localhost:3000, page is directed to login page because there are no routers for the rest of the url*/}
		</Router>
	)
}

export default App