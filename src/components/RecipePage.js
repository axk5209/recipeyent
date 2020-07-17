import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import MainListUserItem from "./MainListUserItem"
import LoggedInHeader from "./LoggedInHeader"
import LoggedInHeaderButtons from "./LoggedInHeaderButtons"
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import { Box } from '@material-ui/core'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import {
	useParams
} from "react-router-dom"
var chefHat = require('./chefHat.jpg')
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



export default function RecipePage(props) {
	const classes = useStyles()
	const id = useParams().id
	const recipe = useSelector(state => state.recipes.find((item) => item.id === id))
	const [checked, setChecked] = useState([0]);

	if (!recipe) return (<div></div>)
	const tags = recipe.tags.sort((a, b) => a.votes > b.votes).slice(0, 5).map(item => item.title).join(", ")
	console.log(recipe)
	
	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};
	return (
		<div>
			<LoggedInHeader>
			</LoggedInHeader>
			<br></br>
			<Container align="center">
				<Typography variant="h2" className={classes.message}>{recipe.title}{`: ${recipe.rating}`}</Typography>
				<Typography variant="h5" className={classes.subheading}>{tags}</Typography>
				<Typography variant="h6">Total Time: {recipe.totalTime} minutes</Typography>
			</Container>
			<Container align="left">
				<Paper square padding={4} margin={5}>
					<Typography variant="h4" className={classes.message}>Ingredients</Typography>
					<ul>
						{recipe.ingredients.map(item => <li>{item}</li>)}
					</ul>
				</Paper>
			</Container>
			<Box mx = {20}>
				<Paper className = {classes.listBackground} >
					<Typography align = "center" variant="h4" className={classes.message}>Ingredients</Typography>
					<List className = {classes.root}>
						{[0, 1, 2, 3].map(value => {
							const labelId = `checkbox-list-label-${value}`;
							return (
								<ListItem
									key={value}
									role={undefined}
									dense
									button
									onClick={handleToggle(value)}
								>
									<ListItemIcon>
										<Checkbox
											edge="start"
											checked={checked.indexOf(value) !== -1}
											tabIndex={-1}
											disableRipple
											inputProps={{ "aria-labelledby": labelId }}
										/>
									</ListItemIcon>
									<ListItemText id={labelId} primary={`Line item ${value + 1}`} />
								</ListItem>
							);
						})}
					</List>
				</Paper>
			</Box>
			<br></br>
			<br></br>
			<Box mx = {20}>
				<Paper className = {classes.listBackground} >
					<Typography align = "center" variant="h4" className={classes.message}>Procedure</Typography>
					<List className = {classes.root}>
						{[0, 1, 2, 3].map(value => {
							const labelId = `checkbox-list-label-${value}`;
							return (
								<ListItem
									key={value}
									role={undefined}
									dense
									button
									onClick={handleToggle(value)}
								>
									<ListItemIcon>
										<Typography variant = "h6" style = {{fontWeight: "bold"}}>{value+1}. </Typography>
									</ListItemIcon>
									<ListItemText id={labelId} primary={`Line item ${value + 1}`} />
								</ListItem>
							);
						})}
					</List>
				</Paper>
			</Box>
			
			

			{
				/*
				Ingredients
				Recipe
				Video
				Reviews
				Button to add review
				Button to add rating
				Button to add tag
				*/
			}
		</div>)
}