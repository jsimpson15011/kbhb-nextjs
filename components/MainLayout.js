import React, {useEffect} from 'react'
import Header from "./Header"
import Footer from "./Footer"
import MaxWidthWrapper from "./MaxWidthWrapper"
import {initGA, logPageView} from "../utils/analytics"
import SideBar from "./SideBar"

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
    <Header menuItems={props.menuItems}/>
    <div className='contents'>
      <div className='wrapper'>
          {props.children}
      </div>
      <SideBar/>
    </div>
    <Footer/>
    <style jsx>
      {
        `
          .contents{
            display: flex;
            max-width: 100%;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
          }
          .wrapper{
            box-sizing: border-box;
            padding: 21px;
            max-width: 100%;
            width: 1100px;
            margin-right: 14px;
          }
`
      }
    </style>
  </div>
)}

export default Layout
