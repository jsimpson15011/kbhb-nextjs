import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import Layout from "../components/Layout"
import SlideShow from "../components/SlideShow"
import {Waypoint} from "react-waypoint"
import anime from "animejs"
import MaxWidthWrapper from "../components/MaxWidthWrapper"
import {withRedux} from "../lib/redux"
import NewsFeedContainer from "../components/NewsFeedContainer"

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
            <section className='country-news'>
              <h2>Kat Country News</h2>
            </section>
            <NewsFeedContainer/>
            {/*<section className='local-news'>
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
            </section>*/}
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