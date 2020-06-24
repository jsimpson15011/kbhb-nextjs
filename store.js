import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension"
import navReducer from './reducers/navReducer'
import newsReducer from "./reducers/newsReducer"
import scheduleReducer from "./reducers/scheduleReducer"
import announcementReducer from "./reducers/announcementReducer"
import covidReducer from "./reducers/covidReducer"
import bannerAdsReducer from "./reducers/bannerAdReducer"
const initialState = {
  navItems: null,
}

const rootReducer = combineReducers({navItems: navReducer, bannerAds: bannerAdsReducer, newsItems: newsReducer, schedule: scheduleReducer, announcements: announcementReducer, covidItems: covidReducer})
export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}
