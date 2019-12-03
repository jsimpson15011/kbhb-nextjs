import React from 'react'
import Head from 'next/head'
import Nav from '../components/Nav'
import fetch from 'isomorphic-unfetch'
import Link from "next/link"
import Header from "../components/Header"
import Layout from "../components/Layout"
import SlideShow from "../components/SlideShow"

const Home = props => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <Layout>
        <SlideShow slideInfo={ props.slideInfo }/>
        {props.blogs.map(blog => {
          return (
            <li key={blog.id}>
              <Link href="blog/[slug]" as={`blog/${blog.slug}`}><a>{blog.title.rendered}</a></Link>
            </li>
          )
        })}
        {props.personalities.map(personality => {
          return (
            <li key={personality.id}>
              <h2>{personality.title.rendered}</h2>

              <img src={personality._embedded['wp:featuredmedia']["0"].media_details.sizes.full.source_url} alt=''/>
            </li>
          )
        })}
      </Layout>
      <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
    </div>
  )
}

Home.getInitialProps = async ({req}) => {
  const blogRes = await fetch('https://katcms.homesliceweb.com/wp-json/wp/v2/posts')
  const blogData = await blogRes.json()

  const personalityRes = await fetch('https://katcms.homesliceweb.com/wp-json/wp/v2/personality?_embed')
  const personalityData = await personalityRes.json()

  return {
    blogs: blogData.map(blog => blog),
    personalities: personalityData.map(personality => personality)
  }
}

export default Home