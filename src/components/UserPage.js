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
import {Image} from "cloudinary-react"
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

	const [followed, setFollowed] = useState (
		currentUser ? 
			(currentUser.followedUsers.find(item => item === id) ? true : false) :
			false
	);
	
	if (!user)
		return (<div></div>)
	console.log(user)
	//user.createdRecipes.length !== 0 ? //console.log("Not Empty") : //console.log("Empty")
	async function onFollow () {
		const updatedFollowedUser = {id: user.id, followerCount: user.followerCount+1}
		const updatedCurrentUserForServer = {id: currentUser.id, followedUsers: currentUser.followedUsers.concat(user.id)}
		const updatedCurrentUserForStore = {...currentUser, followedUsers: currentUser.followedUsers.concat(user.id)}
		await userService.update(updatedFollowedUser)
		await userService.update(updatedCurrentUserForServer)
		dispatch(setCurrentUserAction(updatedCurrentUserForStore))
		setFollowed(true)
		window.localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUserForStore))
	}

	const onUnfollow = async (event) => {
		const updatedFollowedUser = {id: user.id, followerCount: user.followerCount-1}
		const updatedCurrentUserForServer = {id: currentUser.id, followedUsers: currentUser.followedUsers.filter(id => id !== user.id)}
		const updatedCurrentUserForStore = {...currentUser, followedUsers: currentUser.followedUsers.filter(id => id !== user.id)}
		await userService.update(updatedFollowedUser)
		await userService.update(updatedCurrentUserForServer)
		dispatch(setCurrentUserAction(updatedCurrentUserForStore))
		setFollowed(false)
		window.localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUserForStore))
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
				<Typography variant="h5" className={classes.subheading}>{`${user.followerCount} ${user.followerCount === 1 ? "follower" : "followers"}`}</Typography>
				<br></br>
				<Image
					cloudName = "arham"
					publicId = {user.pictureId}
					width = "300"
					height = "300"
				>	
				</Image>
				<br></br>
			</Container>
			<br></br>
			<Container align = "center">
				<CreatedRecipes createdRecipes = {user.createdRecipes}/>					
				<br></br>
				<br></br>
				{(currentUser && user.id !== currentUser.id) && <Button onClick = {followed ? onUnfollow : onFollow} fullWidth variant = "outlined" color = "primary" size = "large">{followed ? "Unfollow" : "Follow"}</Button>}
			</Container>

			{(currentUser && user.id === currentUser.id) &&  
				<Container align="center">
					<br></br>
					<br></br>
					<Typography variant="h5" className={classes.subheading}>You cannot follow yourself.</Typography>
					<br></br>
					<br></br>
				</Container>
			}
			<br></br>
			<br></br>
		</div>

	)
}