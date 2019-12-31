import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension"
import navReducer from './reducers/navReducer'
import newsReducer from "./reducers/newsReducer"
import scheduleReducer from "./reducers/scheduleReducer"
const initialState = {
  navItems: null,
}

const rootReducer = combineReducers({navItems: navReducer, newsItems: newsReducer, schedule: scheduleReducer})
export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}