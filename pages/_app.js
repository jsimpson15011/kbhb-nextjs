import React from "react"

import "../styles/hamburger.css"
import "slick-carousel/slick/slick.css"
import '../styles/slick-theme.css'
import '../styles/audio-player.scss'

function MyApp({Component, pageProps}) {
  return <Component {...pageProps} />
}

/*MyApp.getInitialProps = async ({reduxStore, Component, ctx}) => {
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
}*/

export default MyApp
