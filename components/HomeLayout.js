import React, {useEffect} from 'react'
import Header from "./Header"
import Footer from "./Footer"
import {initGA, logPageView} from "../utils/analytics"

const HomeLayout = props => {
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
      { props.children }
    </div>
    <Footer/>
  </div>
)}

export default HomeLayout