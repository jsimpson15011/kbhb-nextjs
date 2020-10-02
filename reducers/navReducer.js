import fetch from "isomorphic-unfetch"
import {baseUrl} from "../site-settings"

const initialState = {
  navItems: null,
}

export const getNavItems = async (reduxStore) => {
  const navItems = reduxStore.getState().navItems

  if(navItems === null){
    const { dispatch } = reduxStore
    const initialLinks = [{
      slug: '',
      url: '/',
      object: 'page',
      title: 'Home',
      type: 'initial'
    }]
    const navItemsRes = await fetch(`${baseUrl}/wp-json/menus/v1/menus/main-navigation`)
    const newNavData = await navItemsRes.json()
    const newNavItems = initialLinks.concat(newNavData.items)
    dispatch({
      type: 'GET_NAV_ITEMS',
      data: newNavItems
    })
  }
}

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NAV_ITEMS':
      return {
        navItems: action.data,
      }
    default:
      return state
  }
}

export default navReducer
