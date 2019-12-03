import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension"

const initialState = {
  navItems: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NAV_ITEMS':
      return {
        navItems: action.data,
      }
    default:
      return state
  }
}

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}