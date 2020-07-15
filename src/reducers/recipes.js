import recipeService from "../services/recipes"
const {create, getAll} = recipeService
export const addRecipeAction = function (recipe) //action creator
{
	return async dispatch => {
		//console.log("dispatch add recipe")
		//console.log(recipe)
		const recipeObject = await create(recipe) //Concats new recipe to recipelist
		dispatch({
			type: 'ADDRECIPE',
			data: {recipeObject: recipeObject }
		})
	}
}

export const initializeRecipesAction = function () //action creator
{
	return async dispath => { //Gets first state of recipelist
		//console.log("Initialize Recipes")
		const recipes = await getAll()
		//console.log(recipes)
		dispath({ type: 'INITIALIZERECIPES', data: {recipes: recipes } })
	}
}


export const addRecipe = (initialRecipes, recipeObject) => {
	return initialRecipes.concat(recipeObject)
}


const initialState = []

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADDRECIPE':
			{
				return addRecipe(state, action.data.recipeObject)
			}
		case 'INITIALIZERECIPES':
			{
				return action.data.recipes
			}
		default:
			{
				return state
			}
	}

}

export default reducer