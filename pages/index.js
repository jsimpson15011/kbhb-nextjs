import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import Layout from "../components/Layout"
import SlideShow from "../components/SlideShow"
import {Waypoint} from "react-waypoint"
import anime from "animejs"
import MaxWidthWrapper from "../components/MaxWidthWrapper"
import {withRedux} from "../lib/redux"

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
        <title>Home</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta name="description"
              content="KOUT “KAT COUNTRY”, The Black Hills’ Favorite Country station playing a mix of the best of popular country artists in an upbeat, contemporary style"/>
      </Head>
      <Layout>
        <Waypoint onEnter={() => handleFloatUpReveal('slide-show')}/>
        <SlideShow slides={props.slides}/>
        <MaxWidthWrapper>
          <div className="news-section">
            <NewsFeedContainer/>
          </div>
          <div className='tune-genie-player'>
            <iframe name="onair" frameBorder="0" align="top,left" marginHeight="0" marginWidth="0" scrolling="no"
                    width="300"
                    height="480"
                    src="http://kout.tunegenie.com/plugins/onair/?searchbar=on&streamfooter=on&newwindow=on"/>
          </div>
        </MaxWidthWrapper>
      </Layout>
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
  const promotionRes = await fetch('https://katcms.homesliceweb.com/wp-json/wp/v2/promotions?_embed')

  const promotionData = await promotionRes.json()

  const slides = promotionData.filter(
    promotion => {
      const displayStartTime = !parseInt(promotion.meta_box.event_display_start) ? // If start time isn't defined always show until end time has passed
        0
        : promotion.meta_box.event_display_start
      const displayEndTime = !parseInt(promotion.meta_box.event_display_end) ?// If end time isn't defined always show when start date has passed
        2147483647
        : promotion.meta_box.event_display_end
      const timeNow = Math.round(Date.now() / 1000)

      if (timeNow < displayStartTime || timeNow > displayEndTime){
        return false
      }
        return promotion.meta_box.event_home_slide[0]
    })
    .map(promotion => {
      let promotionInfo = {
        image: promotion.meta_box.event_home_slide[0].full_url,
        slug: `/${promotion.type.replace('_', '-')}/${promotion.slug}`,
        alt: promotion.title.rendered
      }
      if (promotion.meta_box.event_external_link) {
        promotionInfo = {
          image: promotion.meta_box.event_home_slide[0].full_url,
          externalLink: promotion.meta_box.event_external_link,
          alt: promotion.title.rendered
        }
      }
      return (
        promotionInfo
      )
    })

  return {
    slides
  }
}


export default withRedux(Home)