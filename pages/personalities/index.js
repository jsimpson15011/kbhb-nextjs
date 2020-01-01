import React from 'react'
import fetch from "isomorphic-unfetch"
import MainLayout from "../../components/MainLayout"
import { withRedux } from "../../lib/redux"
import Head from "next/head"
import Link from "next/link"
import {baseUrl, siteTitle} from "../../site-settings"

const Personalities = props => {
  const personalityLinks = props.personalities.map(personality => {
    return(
      <div key={personality.slug}>
        <Link href={ '/personalities/' + personality.slug}>
          <a>
            {personality.title.rendered}
          </a>
        </Link>
        <style jsx>
          {`
            a{
              font-size: 1.5em;
              color: black;
              background: #f8f8f8;
              text-decoration: none;
              padding: 7px;
              box-shadow: #303030 2px 2px 2px;
            }
            a:focus, a:hover{
              box-shadow: #303030 1px 1px 2px;
            }
            a:active{
              box-shadow: #303030 0 0 2px;
            }
            div{
              margin-bottom: 14px;
              margin-top: 14px;
            }
          `}
        </style>
      </div>
    )
  })
  return (
    <div>
      <Head>
        <title>{siteTitle} - Personalities</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta name="description"
              content="KOUT “KAT COUNTRY”, The Black Hills’ Favorite Country station playing a mix of the best of popular country artists in an upbeat, contemporary style"/>
      </Head>
      <MainLayout>
        <h2>Personalities</h2>
        <nav>
          {personalityLinks}
        </nav>
      </MainLayout>
      <style jsx>
        {`
          nav{
            width: 100%;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            background: white;
          }
        `}
      </style>
    </div>
  )
}

Personalities.getInitialProps = async () => {
  const personalityRes = await fetch(`${baseUrl}/wp-json/wp/v2/personality`)
  const personalityData = await personalityRes.json()


  return {
    personalities: personalityData.map(personality => personality)
  }
}

export default withRedux(Personalities)