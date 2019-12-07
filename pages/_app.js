import React from "react"
import { withRedux } from "../lib/redux"
import App from 'next/app'

import "../styles/blank.css"
import { getNavItems } from "../reducers/navReducer"

function MyApp({Component, pageProps}) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async ({reduxStore, Component, ctx}) => {
  await getNavItems(reduxStore)
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return {pageProps}
}

export default withRedux(MyApp)