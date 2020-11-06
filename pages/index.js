import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import HomeLayout from "../components/HomeLayout"
import SlideShow from "../components/SlideShow"
import {Waypoint} from "react-waypoint"
import anime from "animejs"
import MaxWidthWrapper from "../components/MaxWidthWrapper"
import {activeItemsOnly} from "../utils/eventHelpers"

import dynamic from "next/dynamic"
import {baseUrl, metaDescription, siteTitle} from "../site-settings"
import {fetcher} from "../utils/cachedData"
import SideBar from "../components/SideBar"
import NewsArticle from "../components/NewsArticle"

const Home = props => {
  const categories = props.categories
  const articles = props.articles
  const topStory = articles.filter(article => {
    return article.meta_box.news_top_story === "1"
  })[0]
  const sideArticles = props.articles.filter(article => {
    return article.meta_box.news_side_bar === "1"
  })

  const topStoryCat = categories.filter(category => {
    return category.id === topStory.categories[0]
  })[0]

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
        <title>{siteTitle} - Home</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta name="description"
              content={`${metaDescription}`}/>
      </Head>
      <HomeLayout menuItems={props.menuItems}>
        <Waypoint onEnter={() => handleFloatUpReveal('slide-show')}/>
        <SlideShow slides={props.slides}/>
        <div className="contents">
          <div className="news-section">
            <NewsArticle topStory article={topStory} category={topStoryCat.name}/>
          </div>
          <SideBar articles={sideArticles} categories={props.categories}/>
        </div>
      </HomeLayout>
      <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .contents{
            display: flex;
            max-width: 100%;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
      }
      .news-section {
            box-sizing: border-box;
            padding: 21px;
            max-width: 100%;
            width: 1300px;
            margin-right: 14px;
      }
    `}</style>
    </div>
  )
}

export async function getStaticProps() {
  try {
    const [promoRes, menuItems, categories, articles] = await Promise.all([
      fetch(`${baseUrl}/wp-json/wp/v2/promotions?_embed&per_page=100`),
      fetcher(`${baseUrl}/wp-json/menus/v1/menus/main-navigation`),
      fetcher(`${baseUrl}/wp-json/wp/v2/categories`),
      fetcher(`${baseUrl}/wp-json/wp/v2/posts`)
    ])
    const [promoData] = await Promise.all([
      promoRes.json(),
    ])

    const slides = activeItemsOnly(promoData)
      .map(promotion => {
        let promotionInfo = {
          parentSlug: promotion.type.replace('_', '-'),
          slug: `/${promotion.type.replace('_', '-')}/${promotion.slug}`,
          alt: promotion.title.rendered
        }
        if (promotion.meta_box.event_external_link) {
          promotionInfo.externalLink = promotion.meta_box.event_external_link
        }

        if (promotion.meta_box.event_home_slide && promotion.meta_box.event_home_slide[0]) {
          promotionInfo.image = promotion.meta_box.event_home_slide[0].full_url
        }

        if (promotion.meta_box.event_square_image && promotion.meta_box.event_square_image[0]) {
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
      props: {
        slides: slides,
        menuItems: menuItems,
        articles: articles,
        categories: categories
      }
    }
  } catch (e) {
    console.log(e)
    return {props: {}}
  }
}


export default Home
