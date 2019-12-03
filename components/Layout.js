import React from 'react'
import Header from "./Header"

const Layout = props => (
  <div>
    <Header/>
    <div className='contents'>
      { props.children }
    </div>
    <style jsx >{`

`}</style>
  </div>
)

export default Layout