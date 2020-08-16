import React from "react"
import { Button, makeStyles, MenuItem } from '@material-ui/core'
import ButtonAppBarCollapse from "./HomeHeaderButtonsCollapsed"
import {
	Link
} from "react-router-dom"
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
		marginRight: "0px",
		color: "white",
		fontWeight: "bold",
		"&:hover": {
			//you want this to be the same as the backgroundColor above
			backgroundColor: "#8359ff"
		}
	}
}));

export default function HomeHeaderButtons() {
	const classes = useStyles();
	return (
		<div>
			<ButtonAppBarCollapse>
				<MenuItem>Login</MenuItem>
				<MenuItem>Sign Up</MenuItem>
			</ButtonAppBarCollapse>
			<div>
				<Button component = {Link} to="/login"  className={classes.buttonBar}>Login</Button>
				<Button component = {Link} to="/signup" className={classes.buttonBar}>Sign up</Button>
			</div>
		</div>
	)
}