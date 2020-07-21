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
			<Grid container spacing={2}>
				<Grid item>
					<ButtonBase className={classes.image}>
						<img
							className={classes.img}
							alt="Chef Hat Image"
							src={chefHat}
						/>
					</ButtonBase>
				</Grid>
				<Grid item xs={12} sm container direction = "column">
					<Grid item >
						<Typography variant="h6" display = "inline" style = {{fontWeight: "bold"}}>
							{`${props.title}`}
						</Typography>
						<Typography variant="h6" display = "inline">
							{` \u2022 ${props.rating ? props.rating.toFixed(2): "unrated"}`}
						</Typography>
						<Typography variant="body1" gutterBottom>
							{props.tags}
						</Typography>
						<Typography variant="body2" color="textSecondary">
							{props.author}
						</Typography>
					</Grid>
					<br></br>
					<Grid item >
						<Button component = {Link} to = {`/recipes/${props.id}`} variant="outlined" size="small">
							<Typography variant="body2">
								View Details
							</Typography>
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}
