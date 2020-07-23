import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import {
	Link
} from "react-router-dom"
import {Image} from "cloudinary-react"

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
		height: 150
	},
	img: {
		margin: "auto",
		display: "block",
		maxWidth: "100%",
		maxHeight: "100%"
	}
}));

export default function ComplexGrid(props) {
	const classes = useStyles();
	
	return (
		<Paper elevation={3} className={classes.paper}>
			<Grid container spacing={2} align ="left">
				<Grid item>
						<ButtonBase className={classes.image} >
							{/* <img
								className={classes.img}
								alt="Chef Hat Image"
								src={`https://res.cloudinary.com/arham/image/upload/v1/${props.pictureId}`}
							/> */}
							<Image className = {classes.img}
								cloudName = "arham"
								publicId = {props.pictureId}
								width = "120"
								height = "120"
								radius = "max"
								gravity="auto:0" 
							>	
							</Image> 
						</ButtonBase>
				</Grid>
				<Grid item xs={12} sm container direction = "column">
					
					<Grid item >
						<Typography variant="h5" gutterBottom style = {{fontWeight: "bold"}}>
							{props.name}
						</Typography>
						<Typography variant="body1" gutterBottom>{props.username}</Typography>
						<Typography variant="body2">
							{props.followerCount} followers
						</Typography>
					</Grid>
					<br></br>
					<Grid item >
						<Button variant="outlined" size="small" component = {Link} to = {`/users/${props.id}`}>
							<Typography variant="body2">
								View Profile
							</Typography>
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}
