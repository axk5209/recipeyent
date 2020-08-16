import React, { useEffect, useLayoutEffect, useRef} from 'react'
//import recipeService from './services/recipes'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUserAction } from "./reducers/currentUser"
import MainDisplay from "./components/MainDisplay"
import LoggedIn from "./components/LoggedIn"
import socketIOClient from "socket.io-client";

import {
	BrowserRouter as Router,
} from "react-router-dom"
import NotLoggedIn from './components/NotLoggedIn'
import { initializeRecipesAction } from './reducers/recipes'
import { initializeUsersAction } from './reducers/users'
import recipeService from './services/recipes';


const App = () => {
	const dispatch = useDispatch()
	const unmounted = useRef(false);

	const storeUser = useSelector(state => {
		//console.log("Change detected")
		//console.log(state)
		//return state.user
		return state.currentUser
	})
	

	
	if (!unmounted.current) {
		const currentUserJSON = window.localStorage.getItem('currentUser')
		const currentUser = JSON.parse(currentUserJSON)
		if (currentUser !== null && storeUser === null) {
			dispatch(setCurrentUserAction(currentUser))
			recipeService.setToken(currentUser.token)
		}
	}


	useEffect(() => {
		// const socket = socketIOClient("http://localhost:3003/");
		// socket.on("Connection", data => {
		// 	console.log(data)
		// });
		async function initializeEverything() {
			await dispatch(initializeRecipesAction())
			await dispatch(initializeUsersAction())
		}
		initializeEverything()
		return () => { unmounted.current = true }
		// eslint-disable-next-line
	}, [])//when page first loads



	return (
		<Router >
			{!storeUser && <NotLoggedIn />}
			{storeUser && <LoggedIn />} {/*No matter what is put after localhost:3000, page is directed to login page because there are no routers for the rest of the url*/}
		</Router>
	)
}

export default App