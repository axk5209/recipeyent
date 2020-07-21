import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { findAllByTitle } from "@testing-library/react";
import { CardHeader } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 300,
		margin: "auto",
		transition: "0.3s",
		boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
		"&:hover": {
			boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
		}
	},
	media: {
		paddingTop: "56.25%"
	},

}));
var chefHat = require('./chefHat.jpg')
function LandingPageUserCard(props) {
	//console.log(props)
	const classes = useStyles();
	const user = props.user
	const name = `${user.firstName} ${user.lastName}`
	const followerCountMessage = `${user.followerCount} ${user.followerCount === 1 ? "follower" : "followers"}`
	return (
		<div className="App">
			<Card className={classes.card}>
				<CardHeader title = {name} subheader = {followerCountMessage} />
				<CardMedia
					className={classes.media}
					image={chefHat}
				/>
			</Card>
		</div>
	);
}
export default LandingPageUserCard