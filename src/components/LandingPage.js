import React from 'react'
import LoggedInHeader from './LoggedInHeader'
import GuestHeader from './GuestHeader'
import { Typography, CssBaseline } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import RecipeCard from './RecipeCard'
import { Grid } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
import HomeHeaderButtons from './HomeHeaderButtons'

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
	
}));


const MainDisplay = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<GuestHeader> 
				<HomeHeaderButtons />
			</GuestHeader>
			<br></br>
			<br></br>
			<Container align = "center">
				<Typography variant = "h4" className = {classes.message}>View, Share, and Rate Your Favorite Recipes!</Typography>
			</Container>
			<br></br>
			<br></br>
			<Paper square elevation={0} align = "center">
				<br></br>
				<Typography variant = "h4" align = "center" className = {classes.subheading}>Top-Rated Recipes</Typography>
				<Box mx = {6} my = {4}> 
					<Grid container align = "center" spacing = {6} justify = "center">
						<Grid item xs = {12} md = {6} lg = {3}>
							<RecipeCard />
						</Grid>
						<Grid item xs = {12} md = {6} lg = {3}>
							<RecipeCard />
						</Grid>
						<Grid item xs = {12} md = {6} lg = {3}>
							<RecipeCard />
						</Grid>
						<Grid item xs = {12} md = {6} lg = {3}>
							<RecipeCard />
						</Grid>
					</Grid>
				</Box>
				<Button size = "large" align = "center" variant = "outlined" >View More</Button>
				<br></br>
				<br></br>
			</Paper>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<Paper square elevation={0} align = "center">
				<br></br>
				<Typography variant = "h4" align = "center" className = {classes.subheading}>Top-Rated Recipes</Typography>
				<Box mx = {6} my = {4}> 
					<Grid container align = "center" spacing = {6} justify = "center">
						<Grid item xs = {12} md = {6} lg = {3}>
							<RecipeCard />
						</Grid>
						<Grid item xs = {12} md = {6} lg = {3}>
							<RecipeCard />
						</Grid>
						<Grid item xs = {12} md = {6} lg = {3}>
							<RecipeCard />
						</Grid>
						<Grid item xs = {12} md = {6} lg = {3}>
							<RecipeCard />
						</Grid>
					</Grid>
				</Box>
				<Button size = "large" align = "center" variant = "outlined" >View More</Button>
				<br></br>
				<br></br>
			</Paper>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
		</React.Fragment>
	)
}

export default MainDisplay

