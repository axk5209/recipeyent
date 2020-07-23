import React, { useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { findAllByTitle } from "@testing-library/react";
import { CardHeader } from "@material-ui/core";
import axios from 'axios'


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
		height: 0,
  		paddingTop: '56.25%', // 16:9,
  		marginTop:'30'
	},

}));
var chefHat = require('./chefHat.jpg')
function LandingPageUserCard(props) {
	// const [image, setImage] = useState('')
	// useEffect(() => {
	// 	async function init()
	// 	{
	// 		const response = await axios.get(`https://res.cloudinary.com/arham/image/upload/h_300,w_300/v1/${props.user.pictureId}`)
	// 		console.log(response)
	// 		setImage(response.data)
	// 	}
	// 	init()
	// }, [])
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
					image={`https://res.cloudinary.com/arham/image/upload/v1/${props.user.pictureId}`}
				/>
			</Card>
		</div>
	);
}
export default LandingPageUserCard