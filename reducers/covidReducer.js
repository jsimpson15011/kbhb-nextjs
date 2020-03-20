import fetch from "isomorphic-unfetch"

const initialState = {
  covidItems: null,
}

export const getCovidItems = async (reduxStore) => {
  const covidItems = reduxStore.getState().covidItems.covidItems
  if(covidItems === null){
    const { dispatch } = reduxStore
    const covidItemsRes = await fetch("https://psa.homesliceweb.com/wp-json/wp/v2/covid-19-update")
    const newCovidData = await covidItemsRes.json()

    dispatch({
      type: 'GET_COVID_ITEMS',
      data: {
        covidItems: newCovidData
      }
    })
  }
}

const covidReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COVID_ITEMS':
      return {
        covidItems: action.data,
      }
    default:
      return state
  }
}

export default covidReducer