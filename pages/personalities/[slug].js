import React from 'react'
import fetch from "isomorphic-unfetch"
import ReactHtmlParser from 'react-html-parser'
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"

const Blog = props => {
  const featuredImage = props.content._embedded['wp:featuredmedia'][0].source_url
  return (
    <MainLayout>
      <Head>
        <title>{props.content.title.rendered}</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <h2>
        {props.content.title.rendered}
      </h2>
      {
        featuredImage ?
          <img className="banner" src={featuredImage} alt=""/>
          : ''
      }
      <div>
        {ReactHtmlParser(props.content.content.rendered)}
      </div>
      <style jsx global>{`
    p {
    line-height: 20px;
    margin-bottom: 10px;
    margin-top: 0;
  }          
  a{
            color: white;
          }
`}</style>
      <style jsx>
        {`
          .banner{
            width: 100%;
            margin-bottom: 14px;
          }
        `}
      </style>
    </MainLayout>
  )
}

Blog.getInitialProps = async context => {
  const {slug} = context.query
  const res = await fetch('https://katcms.homesliceweb.com/wp-json/wp/v2/personality?slug=' + slug + '&_embed')
  const data = await res.json()

  return {
    content: data[0]
  }
}

export default Blog