import React from "react"
import { setUserAction } from '../reducers/user'
//import blogService from "../services/blogs"
import { useDispatch, useSelector } from 'react-redux'
import {
	Link
} from "react-router-dom"
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const LoggedInHeader = function () {
	const [value, setValue] = React.useState(2);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const dispatch = useDispatch()
	const user = useSelector(state => state)
	if (!user)
		return <div></div>
	const name = user.name
	const onSubmit = () => {
		console.log("clicked")
		dispatch(setUserAction(null))
		//blogService.setToken(null)
		localStorage.setItem("currentUser", JSON.stringify(null))
	}

	const userDisplayStyle = {
		display: "inline-block",
		margin: 0
	}
	return (
		<div>
			<Tabs
				variant="fullWidth"
				value={value}
				onChange={handleChange}
				aria-label="nav tabs example"
			>
				<Tab label="Blogs"  component={Link} to={"/blogs"} />
				<Tab label="Main" component={Link} to={"/"} />
				<Tab label="Users"  component={Link} to={"/users"} />
			</Tabs>
			<br></br>
			<h3 style={userDisplayStyle}>Logged in as: <b>{name}</b></h3>&nbsp;&nbsp;&nbsp;
			<Button variant = "contained" size = "small" onClick={onSubmit}>Logout</Button>
			<br></br>
			<br></br>
		</div>
	)
}

export default LoggedInHeader