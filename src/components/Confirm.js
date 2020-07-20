import React, { Fragment } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { useDispatch, useSelector } from 'react-redux'
import recipeService from "../services/recipes"
// Destructure props
const Confirm = ({ handleNext, handleBack, values: { title, tags, cookTime, preparationTime, ingredients, procedure } }) => {
	const currentUser = useSelector(state => state.currentUser)


	const formattedTitle = title
	const formattedTags = tags.replace(/\n/g, ",").replace(/\s+/g, '').toLowerCase()
	const formattedCookTime = cookTime
	const formattedPreparationTime = preparationTime
	const formattedIngredients = ingredients.split("\n").map(item => `\u2022${item}`).join("\n")
	const formattedProcedure = procedure.split("\n").map((item, index) => `${index+1}. ${item}`).join("\n")
	async function onConfirm ()
	{
		const serviceAuthor = `${currentUser.firstName} ${currentUser.lastName}`
		const serviceTitle = title
		const serviceTags = tags.replace(/\s+/g, '').toLowerCase().split(",").map(item => ({title: item, votes: 1}))
		const serviceCookTime = parseInt(cookTime)
		const servicePreparationTime = parseInt(preparationTime) 
		const serviceIngredients = ingredients.split("\n")
		const serviceProcedure = procedure.split('\n')

		const newRecipe = {
			author: serviceAuthor,
			title: serviceTitle,
			cookTime: serviceCookTime,
			preparationTime: servicePreparationTime,
			ingredients: serviceIngredients,
			procedure: serviceProcedure
		}
		if (serviceTags.length > 0) //If service tags is not an empty array
		{
			newRecipe.tags = serviceTags
		}
		await recipeService.create(newRecipe)
		handleNext()
		// console.log(serviceTags)
		// console.log(serviceCookTime)
		// console.log(servicePreparationTime)
		// console.log(serviceIngredients)
		// console.log(serviceProcedure)
	}
	return (
		<Fragment>
			<List disablePadding>
				<ListItem>
					<ListItemText primary="Title" secondary={formattedTitle} style = {{wordWrap: "break-word"}}/>
				</ListItem>

				<Divider />

				<ListItem>
					<ListItemText primary="Tags" secondary={formattedTags} style = {{wordWrap: "break-word"}} />
				</ListItem>

				<Divider />

				<ListItem>
					<ListItemText primary="Cook Time" secondary={formattedCookTime} />
				</ListItem>

				<Divider />

				<ListItem>
					<ListItemText primary="Preparation Time" secondary={formattedPreparationTime} />
				</ListItem>

				<Divider />

				<ListItem>
					<ListItemText primary="Ingredients" secondary={formattedIngredients} style = {{wordWrap: "break-word", whiteSpace: 'pre-line'}}/>
				</ListItem>

				<Divider />

				<ListItem>
					<ListItemText primary="Procedure" secondary={formattedProcedure} style = {{wordWrap: "break-word", whiteSpace: 'pre-line'}}/>
				</ListItem>

				<Divider />
			</List>

			<div style={{ display: 'flex', marginTop: 50, justifyContent: 'flex-end' }}>
				<Button variant="contained" color="default" onClick={handleBack}>
					Back
				</Button>
				<Button style={{ marginLeft: 20 }} variant="contained" color="secondary" onClick={onConfirm}>
					Confirm & Continue
				</Button>
			</div>
		</Fragment>
	)
}

export default Confirm
