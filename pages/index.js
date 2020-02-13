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
import SmallImages from "../components/SmallImages"

import dynamic from "next/dynamic"
import {baseUrl, listenLiveUrl, metaDescription, siteTitle} from "../site-settings"
import useScript from "../hooks/useScript"

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
  useScript('//post.futurimedia.com/futuri-post-widget.js')
  return (
    <div>
      <Head>
        <title>{siteTitle} - Home</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta name="description"
              content={`${metaDescription}`}/>
      </Head>
      <HomeLayout>
        <Waypoint onEnter={() => handleFloatUpReveal('slide-show')}/>
        <SlideShow slides={props.slides}/>
        <SmallImages blocks={props.slides}/>
        <MaxWidthWrapper>
          <div className="news-section">
            <NewsFeedContainer/>
          </div>
          <div className='tune-genie-player'>
            <iframe title="listen live" name="onair" frameBorder="0" align="top,left" marginHeight="0" marginWidth="0"
                    scrolling="no"
                    width="300"
                    height="480"
                    src={`${listenLiveUrl}/plugins/onair/?searchbar=on&streamfooter=on&newwindow=on`}/>
                    <div className="futuri-container">
                      <h3>What you missed on The Roadhouse</h3>
                      <div className="futuri-widget" data-config="station=kout&zone=5&next=popup&theme=light&limit=1"/>

                      <h3>What you missed with Mark Houston</h3>
                      <div className="futuri-widget" data-config="station=kout&zone=8&next=popup&theme=light&limit=1"/>
                    </div>

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
      .futuri-container {
        padding: 7px;
        box-sizing: border-box;
        color: black;
        background: #efefef;
      }
    `}</style>
    </div>
  )
}

Home.getInitialProps = async () => {
  try {
    const [promoRes, concertRes, remoteRes, slideRes] = await Promise.all([
      fetch(`${baseUrl}/wp-json/wp/v2/promotions?_embed&per_page=100`),
      fetch(`${baseUrl}/wp-json/wp/v2/concerts?_embed&per_page=100`),
      fetch(`${baseUrl}/wp-json/wp/v2/remote_events?_embed&per_page=100`),
      fetch(`${baseUrl}/wp-json/wp/v2/slideshowimageonly?_embed&per_page=100`)
    ])
    const [promoData, concertData, remoteData, slideData] = await Promise.all([
      promoRes.json(),
      concertRes.json(),
      remoteRes.json(),
      slideRes.json()
    ])
    const combinedEventsData = [].concat(promoData, concertData, remoteData, slideData)

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

        if (parseInt(promotion.meta_box.event_show_on_home_page)) {
          promotionInfo.showOnSlider = true
        } else {
          promotionInfo.showOnSlider = false
        }
        if (parseInt(promotion.meta_box.event_show_below_slider)) {
          promotionInfo.showBelowSlider = true
        } else {
          promotionInfo.showBelowSlider = false
        }
        if (promotion.type === 'slideshowimageonly') {
          promotionInfo.slideIsImageOnly = true
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