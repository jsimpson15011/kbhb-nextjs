const initialState = {
  localNews: null,
  countryNews: null
}

const newsReducer = (state= initialState, action) => {
  switch (action.type) {
    case 'ADD_LOCAL_NEWS':
      return {
        localNews: action.data
      }
    case 'ADD_COUNTRY_NEWS':
      return {
        countryNews: action.data
      }
    default:
      return state
  }
}

export default newsReducer