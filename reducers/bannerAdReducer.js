import fetch from "isomorphic-unfetch"
import {baseUrl} from "../site-settings"
import {activeItemsOnlySpecific} from "../utils/eventHelpers"

const initialState = {
  bannerAds: null,
}

export const getBannerAds = async (reduxStore) => {
  const bannerAds = reduxStore.getState().bannerAds.bannerAds

  if(bannerAds === null){
    const { dispatch } = reduxStore
    const bannerAdsRes = await fetch(`${baseUrl}/wp-json/wp/v2/banner_ad?_embed&per_page=100`)
    const newBannerAdsData = await bannerAdsRes.json()
    const activeBannersOnly = activeItemsOnlySpecific(newBannerAdsData, 'banner_display_start', 'banner_display_end')
    dispatch({
      type: 'GET_BANNER_ADS',
      data: activeBannersOnly
    })
  }
}

const bannerAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BANNER_ADS':
      return {
        bannerAds: action.data,
      }
    default:
      return state
  }
}

export default bannerAdsReducer
