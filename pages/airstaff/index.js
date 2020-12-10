import React from 'react'
import fetch from "isomorphic-unfetch"
import MainLayout from "../../components/MainLayout"
import {withRedux} from "../../lib/redux"
import Head from "next/head"
import Image from "next/image"
import {baseUrl, metaDescription, siteTitle} from "../../site-settings"
import ReactHtmlParser from "react-html-parser"

const Personalities = props => {
  let mapIndex = 0
  const personalityLinks = props.personalities.map(personality => {
    mapIndex += 1
    const mainImg = personality.images
    return (
      <div className="air-staff" key={personality.slug}>
        {
          mainImg ?
            <Image
              className="air-staff__img"
              src={mainImg[0]}
              width={mainImg[1]}
              height={mainImg[2]}
              alt=""
            /> :
            ""
        }
        <div className="air-staff__text">
          <h2>
            {ReactHtmlParser(personality.title.rendered)}
          </h2>
          {ReactHtmlParser(personality.content.rendered)}
        </div>


        <style jsx>
          {`                  
            .air-staff{
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              background: ${mapIndex % 2 ? '#e4eaf5' : 'white'};
              padding: 14px;
              box-sizing: border-box;
              width: 100%;
              margin-bottom: 14px;
              margin-top: 14px;
              justify-content: space-around;
            }
            .air-staff__text{
              width: 850px;
              max-width: 100%;
            }
            .air-staff__img{
              align-self: flex-start;
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
              content={`${metaDescription}`}/>
      </Head>
      <MainLayout>
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
  const personalityRes = await fetch(`${baseUrl}/wp-json/wp/v2/personality?per_page=100&order=asc`)
  const personalityData = await personalityRes.json()


  return {
    personalities: personalityData.map(personality => personality)
  }
}

export default withRedux(Personalities)