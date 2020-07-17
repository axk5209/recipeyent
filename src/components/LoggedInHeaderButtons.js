import React from "react"
import { Button, makeStyles, MenuItem } from '@material-ui/core'
import ButtonAppBarCollapse from "./HomeHeaderButtonsCollapsed"
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUserAction } from "../reducers/currentUser"
const useStyles = makeStyles(theme => ({
	root: {
		position: "absolute",
		right: 0
	},
	buttonBar: {
		[theme.breakpoints.down("xs")]: {
			display: "none"
		},
		marginLeft: "24px",
		marginRight: "0px"
	}
}));

export default function LoggedInHeaderButtons(props) {
	const otherView = props.currentView === "Dashboard" ? "Main" : "Dashboard"

	const classes = useStyles();
	const dispatch = useDispatch();
	const onLogout = async function () 
	{
		window.localStorage.setItem('currentUser', JSON.stringify(null))
		await dispatch(setCurrentUserAction(null))
	}
	return (
		<div>
			<ButtonAppBarCollapse>
				<MenuItem>Main</MenuItem>
				<MenuItem>Logout</MenuItem>
			</ButtonAppBarCollapse>
			<div>
				<Button href={`/${otherView}`} variant="contained"  className={classes.buttonBar}>{otherView}</Button>
				<Button href="/login" variant="contained"  className={classes.buttonBar} onClick = {onLogout}>Logout</Button>
			</div>
		</div>
	)
}