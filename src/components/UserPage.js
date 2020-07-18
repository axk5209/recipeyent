import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import HomeHeaderButtons from "./HomeHeaderButtons"
import LoggedInHeader from "./LoggedInHeader"
import GuestHeader from "./GuestHeader"
import LoggedInHeaderButtons from "./LoggedInHeaderButtons"
import CreatedRecipes from "./CreatedRecipes"

import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import { Box } from '@material-ui/core'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import recipeService from '../services/recipes';
import userService from '../services/users';
import { setCurrentUserAction } from "../reducers/currentUser"

import {
	useParams
} from "react-router-dom"
const useStyles = makeStyles((theme) => ({
	message: {
		flexGrow: 1,
		fontWeight: "bold",
		color: "indigo"
	},
	subheading: {
		flexGrow: 1,
		color: "indigo",
	},
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	listBackground: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},

}));


export default function UserPage ()
{
	const classes = useStyles()
	const id = useParams().id
	const user = useSelector(state => state.users.find((item) => item.id === id))
	const currentUser = useSelector(state => state.currentUser)
	const dispatch = useDispatch()
	if (!user)
		return (<div></div>)
	const tags = user.tags.sort((a, b) => a.votes > b.votes).slice(0, 5).map(item => item.title).join(", ")

	async function onFollow () {
		//console.log("Follow Clicked")
		//console.log(currentUser.followedUsers.concat(user.id))
		const updatedUserForServer = {id: currentUser.id, followedUsers: currentUser.followedUsers.map(user => user.id).concat(user.id)}
		const updatedUserForStore = {...currentUser, followedUsers: currentUser.followedUsers.concat(user)}
		await userService.update(updatedUserForServer)
		dispatch(setCurrentUserAction(updatedUserForStore))
		window.localStorage.setItem("currentUser", JSON.stringify(updatedUserForStore))
	}
	
	return (
		<div>
			{currentUser ?
				<LoggedInHeader>
					<LoggedInHeaderButtons currentView = "Dashboard"/>
				</LoggedInHeader> :
				<GuestHeader>
					<HomeHeaderButtons />
				</GuestHeader>
			}
			<br></br>
			<Container align="center">
				<Typography variant="h2" className={classes.message}>{user.firstName} {user.lastName}</Typography>
				<Typography variant="h5" className={classes.subheading}>{tags ? tags : "No Tags Yet"}</Typography>
				<Typography variant="h6">{user.averageRating ? user.averageRating : "unrated"}</Typography>
			</Container>
			<br></br>
			<Container align = "center">
				{user.createdRecipes ? 
				<CreatedRecipes createdRecipes = {user.createdRecipes}/> :
				"No Recipes Yet"
				}
				<br></br>
				<br></br>
				<Button onClick = {onFollow} fullWidth variant = "outlined" color = "primary" size = "large">Follow</Button>
			</Container>
			<br></br>
			<br></br>
		</div>

	)
}