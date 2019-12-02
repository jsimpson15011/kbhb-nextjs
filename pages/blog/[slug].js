import React from 'react'
import fetch from "isomorphic-unfetch"
import ReactHtmlParser from 'react-html-parser'
import Layout from "../../components/Layout"
import Head from "next/dist/next-server/lib/head"

const Blog = props => {
  return (
    <Layout>
      <Head>
        <title>{props.blog.title.rendered}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h2>
        {props.blog.title.rendered}
      </h2>
      <div>
        {ReactHtmlParser(props.blog.content.rendered)}
      </div>
      <style jsx global>{`
    p {
    line-height: 20px;
    margin-bottom: 10px;
    margin-top: 0;
  }
`}</style>
    </Layout>
  )
}

Blog.getInitialProps = async context => {
  const {slug} = context.query
  const res = await fetch('https://katcms.homesliceweb.com/wp-json/wp/v2/posts?slug=' + slug)
  const data = await res.json()
  console.log(slug)

  return {
    blog: data[0]
  }
}

export default Blog