import axios from 'axios'
const baseUrl = '/api/recipes'

let token = null

const setToken = newToken => {
	//console.log("token set to:" + newToken)
	token = `bearer ${newToken}`
}

const getAll = async () => {
	//console.log("Recipes getting called.")
	const response = await axios.get(baseUrl)
	//console.log("After call:")
	//console.log(response)
	return response.data
}

const create = async (newRecipe) => {
	const config = {
		headers: { Authorization: token },
	}
	try {
		const response = await axios.post(baseUrl, newRecipe, config) //third parameter contains request header
		return response.data
	}
	catch (error)
	{
		return null
	}
}

const update = async (newRecipe) => {
	//console.log(newRecipe)
	//console.log(token)
	const config = {
		headers: { Authorization: token },
	}
	try {
		//console.log("update called")
		//console.log(newRecipe)
		const response = await axios.put(`${baseUrl}/${newRecipe.id}`, newRecipe, config) 
		return response.data
	}
	catch (error)
	{
		//console.log(error)
		return null
	}
}


export default {getAll, create, setToken, update}