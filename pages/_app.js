import React from "react"
import { withRedux } from "../lib/redux"

import "../styles/hamburger.css"
import { getNavItems } from "../reducers/navReducer"
import {getSchedule} from "../reducers/scheduleReducer"

function MyApp({Component, pageProps}) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async ({reduxStore, Component, ctx}) => {
  await getNavItems(reduxStore)
  await getSchedule(reduxStore)
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return {
    pageProps
  }
}

export default withRedux(MyApp)