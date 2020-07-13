export const setUserAction = function (user) //action creator
{
	return async dispatch => {
		dispatch({
			type: 'SET',
			data: {user: user}
		})
	}
}


const initialState = null //current user

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET':
			{
				return action.data.user
			}
		default:
		{
			return state
		}
	}

}

export default reducer