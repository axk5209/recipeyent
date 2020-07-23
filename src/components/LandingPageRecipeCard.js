import React, { useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { findAllByTitle } from "@testing-library/react";
import { CardHeader } from "@material-ui/core";
import {Image} from "cloudinary-react"
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
		paddingTop: "56.25%"
	},

}));
function LandingPageRecipeCard(props) {
	// const [image, setImage] = useState('')
	// useEffect(() => {
	// 	async function init()
	// 	{
	// 		const response = await axios.get(`https://res.cloudinary.com/arham/image/upload/v1/${props.recipe.pictureId}`)
	// 		console.log(response)
	// 		setImage(response.data)
	// 	}
	// 	init()
	// }, [])
	const classes = useStyles();
	const recipe = props.recipe
	const title = `${recipe.title} \u2022 ${recipe.rating ? recipe.rating.toFixed(2): "unrated"}`
	const tags = recipe.tags.length > 0 ? recipe.tags.sort((a, b) => b.votes - a.votes).slice(0, 5).map(item => item.title).join(", ") : "No Tags Yet"
	return (
		<div className="App">
			<Card className={classes.card}>
				<CardHeader title = {title} subheader = {tags} />
				<CardMedia
					className={classes.media}
					image={`https://res.cloudinary.com/arham/image/upload/v1/${props.recipe.pictureId}`}
				/>
			</Card>
		</div>
	);
}
export default LandingPageRecipeCard