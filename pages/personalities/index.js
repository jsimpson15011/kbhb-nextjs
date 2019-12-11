import React from 'react'
import fetch from "isomorphic-unfetch"
import Layout from "../../components/Layout"
import { withRedux } from "../../lib/redux"
import Head from "next/head"

const Personalities = props => {
  return (
    <div>
      <Head>
        <title>Personalities</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta name="description"
              content="KOUT “KAT COUNTRY”, The Black Hills’ Favorite Country station playing a mix of the best of popular country artists in an upbeat, contemporary style"/>
        <script src="http://mpl.tunegenie.com/js/loader.min.js?Math.random()"/>
      </Head>
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