import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import HomeLayout from "../components/HomeLayout"
import SlideShow from "../components/SlideShow"
import {Waypoint} from "react-waypoint"
import anime from "animejs"
import MaxWidthWrapper from "../components/MaxWidthWrapper"
import {withRedux} from "../lib/redux"
import {activeItemsOnly} from "../utils/eventHelpers"

import dynamic from "next/dynamic"

const NewsFeedContainer = dynamic(import('../components/NewsFeedContainer'))

const Home = props => {
  const handleFloatUpReveal = className => {
    anime({
      targets: `.${className}`,
      opacity: 1,
      translateY: 0,
      duration: 350,
      delay: anime.stagger(50, {start: 250}),
      easing: 'easeInOutSine'
    })
  }
  return (
    <div>
      <Head>
        <title>Home - Kat 98.7</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta name="description"
              content="KOUT “KAT COUNTRY”, The Black Hills’ Favorite Country station playing a mix of the best of popular country artists in an upbeat, contemporary style"/>
      </Head>
      <HomeLayout>
        <Waypoint onEnter={() => handleFloatUpReveal('slide-show')}/>
        <SlideShow slides={props.slides}/>
        <MaxWidthWrapper>
          <div className="news-section">
            <NewsFeedContainer/>
          </div>
          <div className='tune-genie-player'>
            <iframe title="listen live" name="onair" frameBorder="0" align="top,left" marginHeight="0" marginWidth="0"
                    scrolling="no"
                    width="300"
                    height="480"
                    src="http://kout.tunegenie.com/plugins/onair/?searchbar=on&streamfooter=on&newwindow=on"/>
          </div>
        </MaxWidthWrapper>
      </HomeLayout>
      <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .news-section {
        width: 644px;
        max-width: 100%;
      }
    `}</style>
    </div>
  )
}

Home.getInitialProps = async () => {
  try {
    const [promoRes, concertRes, remoteRes] = await Promise.all([
      fetch("https://katcms.homesliceweb.com/wp-json/wp/v2/promotions?_embed"),
      fetch("https://katcms.homesliceweb.com/wp-json/wp/v2/concerts?_embed"),
      fetch("https://katcms.homesliceweb.com/wp-json/wp/v2/remote_events?_embed")
    ])
    const [promoData, concertData, remoteData] = await Promise.all([
      promoRes.json(),
      concertRes.json(),
      remoteRes.json()
    ])
    const combinedEventsData = [].concat(promoData, concertData, remoteData)

    const eventsSortedByPublishDate = combinedEventsData.sort((a, b) => {
      const timeA = new Date(a.date).getTime()
      const timeB = new Date(b.date).getTime()
      return timeB - timeA
    })

    const sortedEventsData = eventsSortedByPublishDate.sort((a, b) => {
      return a.meta_box.event_priority - b.meta_box.event_priority
    })

    const slides = activeItemsOnly(sortedEventsData)
      .map(promotion => {
        let promotionInfo = {
          slug: `/${promotion.type.replace('_', '-')}/${promotion.slug}`,
          alt: promotion.title.rendered
        }
        if (promotion.meta_box.event_external_link) {
          promotionInfo.externalLink = promotion.meta_box.event_external_link
        }

        if (promotion.meta_box.event_home_slide[0]) {
          promotionInfo.image = promotion.meta_box.event_home_slide[0].full_url
        }

        if (promotion.meta_box.event_square_image[0]) {
          promotionInfo.smallImage = promotion.meta_box.event_square_image[0].full_url
        }

        return (
          promotionInfo
        )
      })

    return {
      slides
    }
  } catch (e) {
    console.log(e)
  }
}


export default withRedux(Home)