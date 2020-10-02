import React from "react"
import { withRedux } from "../lib/redux"

import "../styles/hamburger.css"
import "slick-carousel/slick/slick.css"
import '../styles/slick-theme.css'
import { getNavItems } from "../reducers/navReducer"
import {getSchedule} from "../reducers/scheduleReducer"
import {getAnnouncementItems} from "../reducers/announcementReducer"
import {getCovidItems} from "../reducers/covidReducer"
import {getBannerAds} from "../reducers/bannerAdReducer"

function MyApp({Component, pageProps}) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async ({reduxStore, Component, ctx}) => {
  await getNavItems(reduxStore)
  await getBannerAds(reduxStore)
  await getAnnouncementItems(reduxStore)
  await getSchedule(reduxStore)
  await getCovidItems(reduxStore)
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return {
    pageProps
  }
}

export default withRedux(MyApp)
