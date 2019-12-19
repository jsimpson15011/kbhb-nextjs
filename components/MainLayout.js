import React from 'react'
import Header from "./Header"
import Footer from "./Footer"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Layout = props => (
  <div>
    <Header/>
    <div className='contents'>
      <MaxWidthWrapper theme = "dark">
          {props.children}
      </MaxWidthWrapper>
    </div>
    <Footer/>
  </div>
)

export default Layout