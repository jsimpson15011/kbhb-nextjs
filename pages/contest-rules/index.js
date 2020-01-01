import React from 'react'
import fetch from "isomorphic-unfetch"
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import DynamicContent from "../../components/DynamicContent"
import {baseUrl, siteTitle} from "../../site-settings"

const About = props => {
  return (
    <MainLayout>
      <Head>
        <title>{siteTitle} - {props.content.title.rendered}</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <DynamicContent content={props.content}/>
    </MainLayout>
  )
}

About.getInitialProps = async () => {
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/pages?slug=contest-rules&_embed`)
  const data = await res.json()

  return {
    content: data[0]
  }
}

export default About