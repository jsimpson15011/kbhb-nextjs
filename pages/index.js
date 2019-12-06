import React, {useCallback} from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import Layout from "../components/Layout"
import Link from "next/link"
import SlideShow from "../components/SlideShow"
import {Waypoint} from "react-waypoint"
import anime from "animejs"
import Parser from 'rss-parser'
import MaxWidthWrapper from "../components/MaxWidthWrapper"
import mainTheme from "../styles/katTheme"
import { getNavItems } from "../reducers/navReducer"
import { withRedux } from "../lib/redux"

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
      </Head>
      <Layout>
        <Waypoint onEnter={() => handleFloatUpReveal('slide-show')}/>
        <SlideShow slides={props.slides}/>
        <MaxWidthWrapper>
          <div className="news-section">
            <section className='country-news'>
              <h2>Kat Country News</h2>
            </section>
            <section className='local-news'>
              <h2>Local News</h2>
              <hr className='thin-hr'/>
              {props.kbhbNewsArticles.map(article => {
                let newsArticle =
                  <article key={ article.title } className='local-article'>
                    <img src={ article.image.url } alt=''/>
                    <div className='local-article-content'>
                      <a href={ article.link }>
                        <h3>{ article.title }</h3>
                      <p>{ article.content }</p>
                      <p className='pub-date'>{ article.pubDate }</p>
                      </a>
                    </div>
                    <hr className='thin-hr'/>
                  </article>
                return (
                  newsArticle
                )
              })}
            </section>
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
      .local-news h2{
        font-size: 2em;
        margin-bottom: .5em;
        text-transform: uppercase;
      }
      .local-article{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
      }
      .local-article img{
        width: 120px;
      }
      .local-article .pub-date{
        font-style: italic;
        margin: .5em 0;
      }
      .local-article-content{
        min-width: 75%;
        width: 400px;
        max-width: 100%;
      }
      .local-article hr{
        width: 100%;
      }
      .local-article a{
        color: white;
        text-decoration: none;
      }
      .local-article h3{
        color: ${ mainTheme.brand };
        font-size: 1.25em;
        margin-bottom: .5em;
        text-transform: uppercase;
      }
    `}</style>
    </div>
  )
}

Home.getInitialProps = async ({ reduxStore }) => {
  const promotionRes = await fetch('https://katcms.homesliceweb.com/wp-json/wp/v2/promotions?_embed')
  const promotionData = await promotionRes.json()

  await getNavItems(reduxStore)

  const parser = new Parser({
    customFields: {
      item: [
        ['image', 'image']
      ]
      ,
    }
  })

  const kbhbFeed = await parser.parseURL('https://kbhbradio.com/rss.php')

  kbhbFeed.items.length = 3

  const slides = promotionData.filter(
    promotion => {
      return promotion._embedded
    })
    .map(promotion => {
      let promotionInfo = {
        image: promotion._embedded['wp:featuredmedia']["0"].media_details.sizes.full.source_url,
        slug: `/${promotion.type.replace('_', '-')}/${promotion.slug}`
      }
      if (promotion.meta_box.event_external_link) {
        promotionInfo = {
          image: promotion._embedded['wp:featuredmedia']["0"].media_details.sizes.full.source_url,
          externalLink: promotion.meta_box.event_external_link
        }
      }
      return (
        promotionInfo
      )
    })

  return {
    slides,
    kbhbNewsArticles: kbhbFeed.items.map(article => article)
  }
}



export default withRedux(Home)