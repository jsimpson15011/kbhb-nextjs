import fetch from "isomorphic-unfetch"

const initialState = {
  announcementItems: null,
}

export const getAnnouncementItems = async (reduxStore) => {
  const announcementItems = reduxStore.getState().announcements.announcementItems
  if(announcementItems === null){
    const { dispatch } = reduxStore
    const announcementItemsRes = await fetch("https://psa.homesliceweb.com/wp-json/wp/v2/psas")
    const newAnnouncementData = await announcementItemsRes.json()
    const newAnnouncementItems = newAnnouncementData.filter(announcement => {
      return announcement.meta_box.psa_date + 25200 > (Math.floor(Date.now()/1000))
    })
    const closureRes = await fetch("https://psa.homesliceweb.com/wp-json/wp/v2/closures")
    const closureData = await closureRes.json()
    const activeClosure = closureData.filter(closure => {
      return closure.meta_box.closureIsShowing === '1'
    })

    const restaurantRes = await fetch("https://psa.homesliceweb.com/wp-json/wp/v2/restaurant-info")
    const restaurantData = await restaurantRes.json()
    let newRestaurantItems = []
    if (restaurantData.length > 0){
      newRestaurantItems = restaurantData.filter(item => {
        return item.meta_box.psa_date + 25200 > (Math.floor(Date.now()/1000))
      })
    }


    dispatch({
      type: 'GET_ANNOUNCEMENT_ITEMS',
      data: {
        announcements: newAnnouncementItems,
        closures: activeClosure,
        restaurantItems: newRestaurantItems
      }
    })
  }
}

const announcementReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ANNOUNCEMENT_ITEMS':
      return {
        announcementItems: action.data,
      }
    default:
      return state
  }
}

export default announcementReducer