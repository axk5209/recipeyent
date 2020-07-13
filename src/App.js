import React, { useEffect } from 'react'
//import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAction } from "./reducers/user"
import MainDisplay from "./components/MainDisplay"

import {
	BrowserRouter as Router,
} from "react-router-dom"
import NotLoggedIn from './components/NotLoggedIn'


const App = () => {

	const dispatch = useDispatch()
	const user = useSelector(state => {
		//console.log("Change detected")
		//console.log(state.user)
		//return state.user
		return state
	})


	useEffect(() => { //when page first loads
		const currentUserJSON = window.localStorage.getItem('currentUser')
		const currentUser = JSON.parse(currentUserJSON)
		if (currentUser !== null) {
			dispatch(setUserAction(currentUser))
			//blogService.setToken(currentUser.token)
		}
		// eslint-disable-next-line
	}, [])



	return (
		<Router>
			{!user && <NotLoggedIn />} 
			{user && <MainDisplay />} {/*No matter what is put after localhost:3000, page is directed to login page because there are no routers for the rest of the url*/}
		</Router>
	)
}

export default App