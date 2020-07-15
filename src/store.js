import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
//import recipeReducer from './reducers/recipes'
import currentUserReducer from './reducers/currentUser'
import recipesReducer from './reducers/recipes'
import usersReducer from './reducers/users'

import thunk from 'redux-thunk'
const reducer = combineReducers({recipes: recipesReducer, currentUser: currentUserReducer, usersReducer: usersReducer})
//const reducer = combineReducers({users: usersReducer, currentUser: currentUserReducer})
//const reducer = userReducer
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export default store