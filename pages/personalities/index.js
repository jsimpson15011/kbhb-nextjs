import React from 'react'
import fetch from "isomorphic-unfetch"
import Layout from "../../components/Layout"
import { withRedux } from "../../lib/redux"
import {getNavItems} from "../../reducers/navReducer"

const Personalities = props => {
  return (
    <div>
      <Layout>
        test
      </Layout>
    </div>
  )
}

Personalities.getInitialProps = async () => {
  const personalityRes = await fetch('https://katcms.homesliceweb.com/wp-json/wp/v2/personality?_embed')
  const personalityData = await personalityRes.json()

  const navItemsRes = await fetch('https://katcms.homesliceweb.com/wp-json/menus/v1/menus/main-navigation')
  const navItemsData = await navItemsRes.json()

  return {
    navItems: navItemsData.items.map(item => item),
    personalities: personalityData.map(personality => personality)
  }
}

export default withRedux(Personalities)