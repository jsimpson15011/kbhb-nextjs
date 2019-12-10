import React from 'react'
import Header from "./Header"
import mainTheme from "../styles/katTheme"
import Footer from "./Footer"

const Layout = props => (
  <div>
    <Header/>
    <div className='contents'>
      { props.children }
    </div>
    <Footer/>
    <style jsx global>{`
      .contents{
        background: ${ mainTheme.background };
        color: white;
      }
      .content li{
        color: white;
      }
`}</style>
  </div>
)

export default Layout