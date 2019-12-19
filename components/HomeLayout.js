import React from 'react'
import Header from "./Header"
import Footer from "./Footer"

const HomeLayout = props => (
  <div>
    <Header/>
    <div className='contents'>
      { props.children }
    </div>
    <Footer/>
  </div>
)

export default HomeLayout