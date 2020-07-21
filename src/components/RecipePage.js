import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import HomeHeaderButtons from "./HomeHeaderButtons"
import LoggedInHeader from "./LoggedInHeader"
import GuestHeader from "./GuestHeader"
import LoggedInHeaderButtons from "./LoggedInHeaderButtons"
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import { Box } from '@material-ui/core'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import recipeService from '../services/recipes';
import userService from '../services/users';
import { setCurrentUserAction } from "../reducers/currentUser"

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
	const currentUser = useSelector(state => state.currentUser)
	const dispatch = useDispatch()
	const [checkedIngredients, setCheckedIngredients] = useState([]);
	const [checkedSteps, setCheckedSteps] = useState([]);
	const [newReview, setNewReview] = useState('');
	const [newRating, setNewRating] = useState('');
	const [newTags, setNewTags] = useState('');
	const [tagsToRemove, setTagsToRemove] = useState('');
	const [favorited, setFavorited] = useState (
		currentUser ? 
			(currentUser.favoritedRecipes.find(item => item === id) ? true : false) :
			false
	);
	const [queued, setQueued] = useState (
		currentUser ? 
			(currentUser.queuedRecipes.find(item => item === id) ? true : false) :
			false
	);
	const [rated, setRated] = useState (
		currentUser &&  currentUser.ratingsGiven && currentUser.ratingsGiven[id]
	);

	const [reviewed, setReviewed] = useState (
		currentUser && currentUser.reviewsGiven && currentUser.reviewsGiven[id]
	);
	const [tagged, setTagged] = useState (
		currentUser && currentUser.tagsGiven && currentUser.tagsGiven[id] && currentUser.tagsGiven[id].length > 0
	);
	
	// useEffect(() => {
	// 	setQueued(currentUser ? 
	// 		(currentUser.queuedRecipes.find(item => item.id) ? true : false) :
	// 		false)
	// }, [currentUser])
	if (!recipe) return (<div></div>)
	//console.log(currentUser)
	//console.log(recipe)
	//console.log(id)
	//currentUser && console.log(currentUser.reviewsGiven)
	//console.log(rated)


	const tags = recipe.tags.sort((a, b) => b.votes - a.votes).slice(0, 5).map(item => item.title).join(", ")
	const reviewsText = recipe.reviews.map(review => review.text)
	const procedureList = recipe.procedure

	const handleToggleIngredient = value => () => {
		const currentIndex = checkedIngredients.indexOf(value);
		const newChecked = [...checkedIngredients];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setCheckedIngredients(newChecked);
	};

	const handleToggleStep = value => () => {
		const currentIndex = checkedSteps.indexOf(value);
		const newChecked = [...checkedSteps];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setCheckedSteps(newChecked);
	};
	
	const onChange = (event) => {
		if (event.target.name === "newReview")
		{
			setNewReview(event.target.value)
		}
		if (event.target.name === "newRating")
		{
			setNewRating(event.target.value)
		}
		if (event.target.name === "newTags")
		{
			setNewTags(event.target.value)
		}
		if (event.target.name === "tagsToRemove")
		{
			setTagsToRemove(event.target.value)
		}
		
	}

	const addReview = async (event) => {
		event.preventDefault()
		// console.log(recipe.rating)
		// console.log(recipe.ratingCount)
		// console.log(newRating)

		const updatedReviewsGiven = {...currentUser.reviewsGiven, [recipe.id]: newReview} //If undefined initially, just makes an object with one key
		const updatedCurrentUserForServer = {id: currentUser.id, "reviewsGiven": updatedReviewsGiven}
		const updatedCurrentUserForStore = {...currentUser, "reviewsGiven": updatedReviewsGiven}
		setReviewed(true)
		await userService.update(updatedCurrentUserForServer)
		dispatch(setCurrentUserAction(updatedCurrentUserForStore))
		window.localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUserForStore))

		const updatedRecipe = {...recipe, reviews: recipe.reviews.concat({userId: currentUser.id, text: newReview})}
		await recipeService.update(updatedRecipe)
		setNewReview('')
	}
	const addRating = async (event) => {
		event.preventDefault()
		// console.log(recipe.rating)
		// console.log(recipe.ratingCount)
		// console.log(newRating)
		const newRatingNumber = parseFloat(newRating)
		let updatedRating
		if (recipe.rating)
			updatedRating = (recipe.rating*recipe.ratingCount+newRatingNumber)/(recipe.ratingCount+1)
		else
			updatedRating = newRatingNumber

		const updatedRatingsGiven = {...currentUser.ratingsGiven, [recipe.id]: newRatingNumber} //If undefined initially, just makes an object with one key
		//console.log(updatedRatingsGiven)
		const updatedCurrentUserForServer = {id: currentUser.id, "ratingsGiven": updatedRatingsGiven}
		const updatedCurrentUserForStore = {...currentUser, "ratingsGiven": updatedRatingsGiven}
		//console.log(updatedCurrentUserForServer)
		//console.log(updatedCurrentUserForStore)
		await userService.update(updatedCurrentUserForServer)
		dispatch(setCurrentUserAction(updatedCurrentUserForStore))
		window.localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUserForStore))
		//console.log(updatedCurrentUserForServer)
		//console.log(updatedCurrentUserForStore)
		const updatedRecipe = {...recipe, ratingCount: recipe.ratingCount+1, rating: updatedRating}
		await recipeService.update(updatedRecipe)
		//console.log(updatedRecipe)
		setRated(true)
		setNewRating('')
		//DESIRED: 3.828
	}
	const removeRating = async (event) => {
		const currentRatingGiven = currentUser.ratingsGiven[recipe.id]
		let updatedRatingsGiven = {...currentUser.ratingsGiven} //If undefined initially, just makes an object with one key
		delete updatedRatingsGiven[recipe.id]

		const updatedCurrentUserForServer = {id: currentUser.id, "ratingsGiven": updatedRatingsGiven}
		const updatedCurrentUserForStore = {...currentUser, "ratingsGiven": updatedRatingsGiven}
		let updatedRating
		if (recipe.ratingCount === 1)
			updatedRating = null
		else
			updatedRating = (recipe.rating*recipe.ratingCount - currentRatingGiven) / (recipe.ratingCount-1)

		setRated(false)
		await userService.update(updatedCurrentUserForServer)
		dispatch(setCurrentUserAction(updatedCurrentUserForStore))
		window.localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUserForStore))

		const updatedRecipe = {...recipe, ratingCount: recipe.ratingCount-1, rating: updatedRating}
		await recipeService.update(updatedRecipe)
	}
	const removeReview = async (event) => {
		const currentReviewGiven = currentUser.reviewsGiven[id]
		let updatedReviewsGiven = {...currentUser.reviewsGiven} //If undefined initially, just makes an object with one key
		delete updatedReviewsGiven[id]

		const updatedCurrentUserForServer = {id: currentUser.id, "reviewsGiven": updatedReviewsGiven}
		const updatedCurrentUserForStore = {...currentUser, "reviewsGiven": updatedReviewsGiven}
		
		setReviewed(false)
		await userService.update(updatedCurrentUserForServer)
		dispatch(setCurrentUserAction(updatedCurrentUserForStore))
		window.localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUserForStore))

		const updatedRecipeReviews = recipe.reviews.filter(review => review.userId !== currentUser.id) //If undefined initially, just makes an object with one key
		//console.log(updatedRecipeReviews)
		const updatedRecipe = {...recipe, reviews: updatedRecipeReviews}
		await recipeService.update(updatedRecipe)
	}
	const addTags = async (event) => {
		event.preventDefault()
		if (!newTags)
		{
			return
		}
		const updatedTags = recipe.tags.slice() //has votes
		let splitTags = newTags.replace(/\s+/g, '').toLowerCase().split(",") //no votes

		if (currentUser.tagsGiven && currentUser.tagsGiven[recipe.id])
		{
			splitTags = splitTags.filter(x => !currentUser.tagsGiven[recipe.id].includes(x))
		}


		splitTags.forEach(tag => {
			
			let foundTag = updatedTags.find((item) => item.title === tag)
			if (foundTag)
			{
				foundTag.votes += 1
			}
			else
			{
				updatedTags.push({title: tag, votes: 1})
			}
		})

		let updatedTagsGiven
		if (currentUser.tagsGiven && currentUser.tagsGiven[recipe.id])
		{
			updatedTagsGiven = {...currentUser.tagsGiven, [recipe.id]: [...currentUser.tagsGiven[recipe.id], ...splitTags]} //If undefined initially, just makes an object with one key
		}
		else
		{
			updatedTagsGiven = {...currentUser.tagsGiven, [recipe.id]: splitTags} //If undefined initially, just makes an object with one key
		}
		const updatedCurrentUserForServer = {id: currentUser.id, "tagsGiven": updatedTagsGiven}
		const updatedCurrentUserForStore = {...currentUser, "tagsGiven": updatedTagsGiven}
		
		await userService.update(updatedCurrentUserForServer)
		dispatch(setCurrentUserAction(updatedCurrentUserForStore))
		window.localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUserForStore))
		if (splitTags.length === 1)
		{
			setTagged(true)
		}
		
		const updatedRecipe = {...recipe, tags: updatedTags}
		await recipeService.update(updatedRecipe)
		setNewTags('')
	}
	const removeTags = async (event) => {
		event.preventDefault()
		console.log(currentUser)
		console.log(recipe)
		let splitTags = tagsToRemove.replace(/\s+/g, '').toLowerCase().split(",")
		splitTags = splitTags.filter(x => currentUser.tagsGiven[recipe.id].includes(x))
		//console.log(splitTags)
		let updatedTags = recipe.tags.slice()
		//console.log(updatedTags.slice())
		splitTags.forEach(tag => {
			let foundTag = updatedTags.find((item) => item.title === tag)
			//console.log(foundTag.clone())
			if (foundTag)
			{
				if (foundTag.votes === 1)
				{
					//console.log("Tag Found")
					//console.log(updatedTags.slice())
					updatedTags = updatedTags.filter(x => x.title !== tag)
					//console.log(updatedTags.slice())
				}
				else
				{
					foundTag.votes -= 1
				}
			}
		})
		//console.log(updatedTags.slice())
		const tagsGivenToThisRecipe = currentUser.tagsGiven[recipe.id].filter(x => !splitTags.includes(x))
		const updatedTagsGiven = {...currentUser.tagsGiven, [recipe.id]: tagsGivenToThisRecipe} //If undefined initially, just makes an object with one key
		//console.log(updatedTagsGiven)
		const updatedCurrentUserForServer = {id: currentUser.id, "tagsGiven": updatedTagsGiven}
		const updatedCurrentUserForStore = {...currentUser, "tagsGiven": updatedTagsGiven}
		
		await userService.update(updatedCurrentUserForServer)
		dispatch(setCurrentUserAction(updatedCurrentUserForStore))
		window.localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUserForStore))
		if (tagsGivenToThisRecipe.length === 0)
		{
			setTagged(false)
		}
		const updatedRecipe = {...recipe, tags: updatedTags}
		await recipeService.update(updatedRecipe)
		setTagsToRemove('')
	}

	const onQueue = async (event) => {
		const updatedUserForServer = {id: currentUser.id, queuedRecipes: currentUser.queuedRecipes.concat(recipe.id)}
		const updatedUserForStore = {...currentUser, queuedRecipes: currentUser.queuedRecipes.concat(recipe.id)}
		await userService.update(updatedUserForServer)
		dispatch(setCurrentUserAction(updatedUserForStore))
		setQueued(true)
		window.localStorage.setItem("currentUser", JSON.stringify(updatedUserForStore))
	}

	const onFavorite = async (event) => {
		const updatedUserForServer = {id: currentUser.id, favoritedRecipes: currentUser.favoritedRecipes.concat(recipe.id)}
		const updatedUserForStore = {...currentUser, favoritedRecipes: currentUser.favoritedRecipes.concat(recipe.id)}
		await userService.update(updatedUserForServer)
		dispatch(setCurrentUserAction(updatedUserForStore))
		setFavorited(true)
		window.localStorage.setItem("currentUser", JSON.stringify(updatedUserForStore))
	}

	const onUnqueue = async (event) => {
		const updatedUserForServer = {id: currentUser.id, queuedRecipes: currentUser.queuedRecipes.filter(id => id !== recipe.id)}
		const updatedUserForStore = {...currentUser, queuedRecipes: currentUser.queuedRecipes.filter(id => id !== recipe.id)}
		await userService.update(updatedUserForServer)
		dispatch(setCurrentUserAction(updatedUserForStore))
		setQueued(false)
		window.localStorage.setItem("currentUser", JSON.stringify(updatedUserForStore))
	}

	const onUnfavorite = async (event) => {
		const updatedUserForServer = {id: currentUser.id, favoritedRecipes: currentUser.favoritedRecipes.filter(id => id !== recipe.id)}
		const updatedUserForStore = {...currentUser, favoritedRecipes: currentUser.favoritedRecipes.filter(id => id !== recipe.id)}
		await userService.update(updatedUserForServer)
		dispatch(setCurrentUserAction(updatedUserForStore))
		setFavorited(false)
		window.localStorage.setItem("currentUser", JSON.stringify(updatedUserForStore))
	}

	return (
		<div>
			{currentUser ?
				<LoggedInHeader>
					<LoggedInHeaderButtons currentView = "Dashboard"/>
				</LoggedInHeader> :
				<GuestHeader>
					<HomeHeaderButtons />
				</GuestHeader>
			}
			{}
			<br></br>
			<Container align="center">
				<Typography variant="h2" className={classes.message}>{recipe.title}{recipe.rating ? `: ${recipe.rating.toFixed(2)}` : " (unrated)"}</Typography>
				<Typography variant="h5" className={classes.subheading}>{tags ? tags : "No Tags Yet"}</Typography>
				<Typography variant="h6">Total Time: {recipe.totalTime} minutes</Typography>
			</Container>
			<br></br>

			<Box mx = {20}>
				<Paper className = {classes.listBackground} >
					<Typography align = "center" variant="h4" className={classes.message}>Ingredients</Typography>
					<List className = {classes.root}>
						{recipe.ingredients.map((ingredient, value) => {
							const labelId = `checkbox-list-label-${value}`;
							return (
								<ListItem
									key={value}
									role={undefined}
									dense
									button
									onClick={handleToggleIngredient(value)}
								>
									<ListItemIcon>
										<Checkbox
											edge="start"
											checked={checkedIngredients.indexOf(value) !== -1}
											tabIndex={-1}
											disableRipple
											inputProps={{ "aria-labelledby": labelId }}
										/>
									</ListItemIcon>
									<ListItemText id={labelId} primary={ingredient} />
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
						{procedureList.map((step, value) => {
							const labelId = `checkbox-list-label-${value}`;
							return (
								<ListItem
									key={value}
									role={undefined}
									dense
									button
									onClick={handleToggleStep(value)}
								>
									<ListItemIcon>
										<Checkbox
											edge="start"
											checked={checkedSteps.indexOf(value) !== -1}
											tabIndex={-1}
											disableRipple
											inputProps={{ "aria-labelledby": labelId }}
										/>
									</ListItemIcon>
									<ListItemText id={labelId}>
										<Typography display = "inline" varaint = "h4" style = {{fontWeight: "bold"}}>{`${value+1}. `}</Typography>
										<Typography display = "inline" varaint = "h6" >{step}</Typography>
									</ListItemText>
								</ListItem>
							);
						})}
					</List>
				</Paper>
			</Box>

			<br></br>
			<br></br>
			<Box mx = {20}>
				<Paper style={{ padding: 16 }} className = {classes.listBackground}  >
					<Typography align = "center" variant="h4" className={classes.message}>Reviews</Typography>
					<List className = {classes.root}>
						{reviewsText.map((review, value) =>
							<div key={value}>
								<ListItem
									role={undefined}
									dense
									button
								>
									<ListItemText>
										<Typography display = "inline" varaint = "body" >{review}</Typography>
									</ListItemText>
								</ListItem>
								{value !== recipe.reviews.length-1 && <Divider />}
							</div>
						)}	
					</List>
				</Paper>
			</Box>
			<br></br>
			<br></br>
			{(currentUser && recipe.author.id !== currentUser.id) && 
			<div>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				{
					rated ?
						<Box mx = {20}>
							<Paper style={{ padding: 16 }}>
								<Container align = "center">
									<Typography variant = "h5" display = "inline">Your Rating: </Typography>
									<Typography variant = "h5" display = "inline" style = {{fontWeight: "bold"}}>{currentUser.ratingsGiven[id].toFixed(2)}</Typography>
								</Container>
								<br></br>
								<Button fullWidth variant = "outlined" color = "primary" size = "large" onClick = {removeRating}>Remove Rating</Button>
							</Paper>
						</Box> :
						<Box mx = {20}>
							<Paper style={{ padding: 16 }}>
								<form className={classes.root} noValidate autoComplete="off" onSubmit={addRating}>
									<TextField fullWidth id="standard-basic-review" name = "newRating" label="Between 1-5..." onChange={onChange} value={newRating} />
									<br></br>
									<br></br>
									<Button type = "submit" fullWidth variant = "outlined" color = "primary" size = "large">Add Rating</Button>
								</form>
							</Paper>
						</Box> 
				}
				<br></br>
				<br></br>
				{
					reviewed ?
						<Box mx = {20}>
							<Paper style={{ padding: 16 }}>
								<Container align = "center">
									<Typography variant = "h5">Your Review</Typography>
									<Box fontStyle="italic">
										<Typography variant = "body1" style = {{wordWrap: "break-word"}}>{`"${currentUser.reviewsGiven[id]}"`}</Typography>
									</Box>
								</Container>
								<br></br>
								<Button fullWidth variant = "outlined" color = "primary" size = "large" onClick = {removeReview}>Remove Review</Button>
							</Paper>
						</Box>:
						<Box mx = {20}>
							<Paper style={{ padding: 16 }}>
								<form className={classes.root} noValidate autoComplete="off" onSubmit={addReview}>
									<TextField fullWidth id="standard-basic-rating" name = "newReview" label="This recipe was..." onChange={onChange} value={newReview} />
									<br></br>
									<br></br>
									<Button type = "submit" fullWidth variant = "outlined" color = "primary" size = "large">Add Review</Button>
								</form>
							</Paper>
						</Box>
				}
				<br></br>
				<br></br>
				{
					tagged ?
						<Box mx = {20}>
							<Paper style={{ padding: 16 }}>
								<Container align = "center">
									<Typography variant = "h5">Your Tags</Typography>
									<Box fontStyle="italic">
										<Typography variant = "body1" style = {{wordWrap: "break-word"}}>{currentUser.tagsGiven[recipe.id].join(", ")}</Typography>
									</Box>
								</Container>
								<br></br>
								<form className={classes.root} noValidate autoComplete="off" onSubmit={addTags}>
									<TextField fullWidth id="standard-basic-tags" name = "newTags" label="sweet, sour, amazing" onChange={onChange} value={newTags} />
									<br></br>
									<br></br>
									<Button type = "submit" fullWidth variant = "outlined" color = "primary" size = "large">Add Tags</Button>
								</form>
								<form className={classes.root} noValidate autoComplete="off" onSubmit={removeTags}>
									<TextField fullWidth id="standard-basic-tags" name = "tagsToRemove" label="tag you have added" onChange={onChange} value={tagsToRemove} />
									<br></br>
									<br></br>
									<Button type = "submit" fullWidth variant = "outlined" color = "primary" size = "large">Remove Tags</Button>
								</form>
							</Paper>
						</Box> :
						<Box mx = {20}>
							<Paper style={{ padding: 16 }}>
								<form className={classes.root} noValidate autoComplete="off" onSubmit={addTags}>
									<TextField fullWidth id="standard-basic-tags" name = "newTags" label="sweet, sour, amazing" onChange={onChange} value={newTags} />
									<br></br>
									<br></br>
									<Button type = "submit" fullWidth variant = "outlined" color = "primary" size = "large">Add Tags</Button>
								</form>
							</Paper>
						</Box>
				}
				<br></br>
				<br></br>
				<Box mx = {20}>
					<Button onClick = {favorited ? onUnfavorite : onFavorite} fullWidth variant = "contained" color = "primary" size = "large">{favorited ? "unfavorite" : "favorite"}</Button>
				</Box>
				<br></br>
				<br></br>
				<Box mx = {20}>
					<Button  onClick = {queued ? onUnqueue : onQueue} fullWidth variant = "contained" color = "primary" size = "large">{queued ? "unqueue" : "queue"}</Button>
				</Box>
				<br></br>
				<br></br>
			</div>
			
			}

			{(currentUser && recipe.author.id === currentUser.id) &&  
				<Container align="center">
					<br></br>
					<br></br>
					<Typography variant="h5" className={classes.subheading}>You cannot express your opinions on this recipe because you created it.</Typography>
					<br></br>
					<br></br>
				</Container>
			}
			<br></br>
			<br></br>
		</div>
	)
}