import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
//import blogReducer from './reducers/blogs'
import userReducer from './reducers/user'
import thunk from 'redux-thunk'
//const reducer = combineReducers({blogs: blogReducer, user: userReducer})
const reducer = userReducer
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export default store