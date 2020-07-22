import axios from 'axios'
const baseUrl = '/api/uploads'

const create = async (fileInfo) => {
	const response = await axios.post(baseUrl, fileInfo)
	return response.data
}


export default {create}