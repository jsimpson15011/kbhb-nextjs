import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension"
import navReducer from './reducers/navReducer'
import newsReducer from "./reducers/newsReducer"
const initialState = {
  navItems: null,
}

const rootReducer = combineReducers({navItems: navReducer, newsItems: newsReducer})
export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}