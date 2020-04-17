import React, {useEffect} from 'react'
import Header from "./Header"
import Footer from "./Footer"
import MaxWidthWrapper from "./MaxWidthWrapper"
import {initGA, logPageView} from "../utils/analytics"

const Layout = props => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, [])

  return (
  <div>
    <Header/>
    <div className='contents'>
      <MaxWidthWrapper theme = "dark">
          {props.children}
      </MaxWidthWrapper>
    </div>
    <Footer/>
  </div>
)}

export default Layout