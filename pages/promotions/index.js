import React from 'react'
import fetch from "isomorphic-unfetch"
import ReactHtmlParser from 'react-html-parser'
import MainLayout from "../../components/MainLayout"
import {withRedux} from "../../lib/redux"
import Head from "next/head"
import Link from "next/link"
import mainTheme from "../../styles/katTheme"

const Personalities = props => {
  const eventLinks = props.events.map(event => {
    const externalLink = event.meta_box.event_external_link

    return (
      <div className="event-container" key={event.slug}>
        {
          event.meta_box.event_square_image[0] ?
            <img src={event.meta_box.event_square_image[0].full_url} alt=""/>
            : ''
        }
        {
          externalLink ?
            <a href={externalLink}>
              {ReactHtmlParser(event.title.rendered)}
            </a>
            : <Link href={'/promotions/' + event.slug}>
              <a>
                {ReactHtmlParser(event.title.rendered)}
              </a>
            </Link>
        }
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
            .event-container{
              box-sizing: border-box;
              margin-bottom: 14px;
              margin-top: 14px;
              background: #e2e2e2;
              padding: 14px;
              display: flex;
              align-items: center;
              width: 100%;
              justify-content: space-around;
            }
          `}
        </style>
      </div>
    )
  })
  return (
    <div>
      <Head>
        <title>Promotions</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta name="description"
              content="KOUT “KAT COUNTRY”, The Black Hills’ Favorite Country station playing a mix of the best of popular country artists in an upbeat, contemporary style"/>
      </Head>
      <MainLayout>
        <h2>Promotions</h2>
        <nav>
          {eventLinks}
        </nav>
      </MainLayout>
      <style jsx>
        {`
          nav{
            width: 100%;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            flex-direction: column;
          }
        `}
      </style>
    </div>
  )
}

Personalities.getInitialProps = async () => {
  const eventRes = await fetch('https://katcms.homesliceweb.com/wp-json/wp/v2/promotions')
  const eventData = await eventRes.json()


  return {
    events: eventData.map(event => event)
  }
}

export default withRedux(Personalities)