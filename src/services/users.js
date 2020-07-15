import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (userInfo) => {
	const response = await axios.post(baseUrl, userInfo)
	return response.data
}


export default { getAll, create}