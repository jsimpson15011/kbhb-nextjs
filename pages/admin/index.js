import React from 'react'
import {baseUrl} from "../../site-settings"

const Admin = () => {

  return(
    <div/>
  )
}

Admin.getInitialProps = ({ res }) => {

  if (res) {
    res.writeHead(302, {
      Location: baseUrl + "/admin"
    })
    res.end()
  }

  return {}
}

export default Admin
