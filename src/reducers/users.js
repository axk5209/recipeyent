import usersService from "../services/users"
const {create, getAll} = usersService


export const updateUserInStoreAction = function (userObject) //action creator
{
	return async dispatch => {
		dispatch({
			type: 'UPDATEUSER',
			data: {userObject}
		})
	}
}

export const addUserToStoreAction = function (userObject) //action creator
{
	return async dispatch => {
		//console.log("dispatch add user")
		//console.log(user)
		dispatch({
			type: 'ADDUSER',
			data: {userObject: userObject }
		})
	}
}

export const User = function (user) //action creator
{
	return async dispatch => {
		//console.log("dispatch add user")
		//console.log(user)
		const userObject = await create(user) //Concats new user to userlist
		dispatch({
			type: 'ADDUSER',
			data: {userObject: userObject }
		})
	}
}

export const initializeUsersAction = function () //action creator
{
	return async dispath => { //Gets first state of userlist
		//console.log("USERS BEING ACCESSED FOR SOME REASON")
		const users = await getAll()
		dispath({ type: 'INITIALIZEUSERS', data: {users: users } })
	}
}


export const addUser = (initialUsers, userObject) => {
	return initialUsers.concat(userObject)
}



export const updateUser = (initialUsers, userObject) => {
	//console.log(userObject)
	return initialUsers.map(oldUser => oldUser.id === userObject.id ? userObject : oldUser)
}


const initialState = []

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADDUSER':
			{
				return addUser(state, action.data.userObject)
			}
		case 'INITIALIZEUSERS':
			{
				//console.log("USER REDUCER BEING ACCESSED")
				return action.data.users
			}
		case 'UPDATEUSER':
		{
			return updateUser(state, action.data.userObject)
		}
		default:
			{
				return state
			}
	}

}

export default reducer