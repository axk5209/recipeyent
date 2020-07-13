import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = (userInfo) => {
	const request = axios.post(baseUrl, userInfo)
	return request.then(response => response.data)
}


export default { getAll, create}