import React from 'react'
import fetch from "isomorphic-unfetch"
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import DynamicContent from "../../components/DynamicContent"
import ReactHtmlParser from "react-html-parser"

const Promotion = props => {
  return (
    <MainLayout>
      <Head>
        <title>{ReactHtmlParser(props.content.title.rendered)}</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <DynamicContent content={props.content}/>
    </MainLayout>
  )
}

Promotion.getInitialProps = async context => {
  const {slug} = context.query
  const res = await fetch('https://katcms.homesliceweb.com/wp-json/wp/v2/promotions?slug=' + slug + '&_embed')
  const data = await res.json()

  return {
    content: data[0]
  }
}

export default Promotion