import React, { useEffect } from 'react'
import LoggedInHeader from './LoggedInHeader'
import CreatedRecipes from './CreatedRecipes'
import LoggedInHeaderButtons from './LoggedInHeaderButtons'
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core'
import { Typography, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core'
import {
	Link
} from "react-router-dom"
const useStyles = makeStyles((theme) => ({
	createButton: {
		flexGrow: 1,
		textTransform: "none",
		color: "indigo"
	},
	message: {
		flexGrow: 1,
		fontWeight: "bold",
		color: "indigo"
	},
	subheading: {
		flexGrow: 1,
		color: "indigo",
	},
	
}));

const Dashboard = () => {
	const classes = useStyles()
	const currentUser = useSelector(state => {
		//console.log(state)
		return state.currentUser ? state.currentUser: null
	})
	//console.log(currentUser)


	return (
		<div>
			<LoggedInHeader>
				<LoggedInHeaderButtons currentView = "Dashboard"/>
			</LoggedInHeader>
			<br></br>
			{/* <Container align = "center">
				<Typography variant = "h5" className = {classes.subheading}>Welcome {currentUser.username}!</Typography>
			</Container> */}
			<Container align = "center">
				<Typography variant = "h3" className = {classes.message}>Hi {currentUser.firstName}!</Typography>
				<Typography variant="h5">{`You have ${currentUser.followerCount} followers`}</Typography>
			</Container>
			<br></br>
			
			<br></br>
			<Container align = "center">
				<Typography variant = "h3" className = {classes.subheading}>Your Recipes</Typography>
				<Button variant = "outlined" size = "large" color="primary" component = {Link} to = {"/create"}>
					<Typography variant = "h5" className = {classes.createButton}>Create New</Typography>
				</Button>
			</Container>
			<br></br>
			<Container align = "center">
				{currentUser.createdRecipes && <CreatedRecipes createdRecipes = {currentUser.createdRecipes}/>}
			</Container>
			{/*Pagination-based view of "your recipes" (for now, just display random 5)*/}
		</div>
	)
}

export default Dashboard

