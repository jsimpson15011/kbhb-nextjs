import React from 'react'
import Head from "next/head"
import MainLayout from "../../components/MainLayout"
import { formatDate} from "../../utils/eventHelpers"
import { metaDescription, siteTitle} from "../../site-settings"
import {useSelector} from "react-redux"
import ReactHtmlParser from "react-html-parser"
import Link from "next/link"
import mainTheme from "../../styles/katTheme"

const Announcements = () => {
  const announcementItems = useSelector(state => state.announcements.announcementItems.restaurantItems)
  const announcementLinks = (announcements) => announcements.map(event => {
    const externalLink = event.meta_box.event_external_link

    return (
      <div className="event-container" key={event.slug}>
        {
          externalLink ?
            <a href={externalLink}>
              {ReactHtmlParser(event.title.rendered)}
              {formatDate(event.meta_box.event_event_date_time)}
            </a>
            : <Link href={`/restaurant-info/${event.slug}`}>
              <a>
                {ReactHtmlParser(event.title.rendered)}
                {formatDate(event.meta_box.event_event_date_time)}
              </a>
            </Link>
        }
        <style jsx>
          {`
            a{
              font-size: 1.5em;
              color: #dddddd;
              background: #231F20;
              text-decoration: none;
              padding: 7px;
              box-shadow: #303030 3px 3px 3px;
              margin-left: 7px;
              width: 100%;
              text-align: center;
            }
            img{
              margin-bottom: 14px;
            }
            a:focus, a:hover{
              box-shadow: #575757 1px 1px 2px;
            }
            a:active{
              box-shadow: #575757 0 0 2px;
            }
            .event-container{
              box-sizing: border-box;
              margin-bottom: 21px;
              background: #f4f4f4;
              border-left: ${mainTheme.brand} solid 10.5px;
              padding: 14px;
              display: flex;
              flex-wrap: wrap;
              align-items: flex-start;
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
        <title>{siteTitle} - Restaurant Info</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta name="description"
              content={`${metaDescription}`}/>
      </Head>
      <MainLayout>
        <h2>Announcements</h2>
        {announcementLinks(announcementItems)}
      </MainLayout>
    </div>
  )
}

export default Announcements