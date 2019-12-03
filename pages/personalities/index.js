import React from 'react'
import fetch from "isomorphic-unfetch"
import Layout from "../../components/Layout"

const Personalities = props => {
  return (
    <div>
      <Layout>
        test
      </Layout>
    </div>
  )
}

Personalities.getInitialProps = async ({req}) => {
  const blogRes = await fetch('https://katcms.homesliceweb.com/wp-json/wp/v2/posts')
  const blogData = await blogRes.json()

  const personalityRes = await fetch('https://katcms.homesliceweb.com/wp-json/wp/v2/personality?_embed')
  const personalityData = await personalityRes.json()

  const navItemsRes = await fetch('https://katcms.homesliceweb.com/wp-json/menus/v1/menus/main-navigation')
  const navItemsData = await navItemsRes.json()

  return {
    blogs: blogData.map(blog => blog),
    navItems: navItemsData.items.map(item => item),
    personalities: personalityData.map(personality => personality)
  }
}

export default Personalities