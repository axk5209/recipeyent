import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import MainListRecipeItem from "./MainListRecipeItem"
var chefHat = require('./chefHat.jpg')
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		margin: "auto",
		maxWidth: 500
	},
	image: {
		width: 150,
		height: 128
	},
	img: {
		margin: "auto",
		display: "block",
		maxWidth: "100%",
		maxHeight: "100%"
	}
}));

export default function MainRecipeList(props) {
	const classes = useStyles();
	const displayItems = props.displayItems.map(recipe => {
		const title = recipe.title
		const author = recipe.author.firstName + ' ' + recipe.author.lastName
		const tags = recipe.tags.length > 0 ? recipe.tags.sort((a, b) => a.votes > b.votes).slice(0, 5).map(item => item.title).join(", ") : "No Tags Yet"
		return <div key = {recipe.id}><MainListRecipeItem title = {title} author = {author} tags = {tags}/><br></br></div>
	})
	return (
		<div className={classes.root}>
			{displayItems}
		</div>
	);
}
