import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import MainListUserItem from "./MainListUserItem"

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

export default function MainUsersList(props) {
	const classes = useStyles();
	//console.log(props)
	const displayItems = props.displayItems.map(user => {
		const name = user.firstName + " " + user.lastName
		const tags = user.tags.length > 0 ? user.tags.sort((a, b) => a.votes > b.votes).slice(0, 5).map(item => item.title).join(", ") : "No Tags Yet. Give the first!"
		return <div key = {user.id}><MainListUserItem name = {name} tags = {tags} id = {user.id}/><br></br></div>
	})
	return (
		<div className={classes.root}>
			{displayItems}
		</div>
	);
}
