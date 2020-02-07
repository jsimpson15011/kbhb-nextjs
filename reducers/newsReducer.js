const initialState = {
  localNews: null,
  musicNews: null
}

const newsReducer = (state= initialState, action) => {
  switch (action.type) {
    case 'ADD_LOCAL_NEWS':
      return {
        localNews: action.data,
        musicNews: state.musicNews
      }
    case 'ADD_MUSIC_NEWS':
      return {
        localNews: state.localNews,
        musicNews: action.data
      }
    default:
      return state
  }
}

export default newsReducer