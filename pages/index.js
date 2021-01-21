import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import HomeLayout from "../components/HomeLayout"
import SlideShow from "../components/SlideShow"
import {Waypoint} from "react-waypoint"
import anime from "animejs"
import {activeItemsOnly} from "../utils/eventHelpers"

import {baseUrl, metaDescription, siteTitle} from "../site-settings"
import {fetcher, useArticles} from "../utils/cachedData"
import SideBar from "../components/SideBar"
import NewsArticle from "../components/NewsArticle"
import {categoryColor} from "../utils/articleFunctions"
import Ad from "../components/Ad"
import {belowSlidesMessage, listenLiveUrl} from "../site-settings"
import mainTheme from "../styles/katTheme"

const StationMessage = () => {
  return (
    <div>
      <h2>{belowSlidesMessage}</h2>
      <a href={listenLiveUrl} className='listen-online'>Listen Online Now</a>
      <a href="https://thehomeslicegroup.com/" className='homeslice-media'>Homeslice Media Group</a>
      <style jsx>{`
        div {
          background: ${mainTheme.accent};
          color: white;
          display: flex;
          flex-wrap: wrap;
          text-transform: uppercase;
          align-items: center;
          font-weight: bold;
          letter-spacing: 2px;
          margin-bottom: 14px;
          margin-top: 14px;
          width: 100%;
        }

        a:hover, a:focus {
          background: ${mainTheme.accent};
          border: 1px solid
        }

        h2 {
          margin-left: auto;
          margin-right: 3em;
          margin-bottom: 0;
          font-size: 1em;
        }

        .listen-online {
          background: black;
          border: 1px solid black;
        }

        .homeslice-media {
          background: #104b7d;
          border: 1px solid #104b7d;
          margin-right: 2em;
        }

        .listen-online, .homeslice-media {
          color: white;
          text-decoration: none;
          padding: .3em .8em;
        }
      `}</style>
    </div>
  )
}

const Home = props => {
  const categories = props.categories
  const {articles, isLoading, isError} = useArticles({
    url: `${baseUrl}/wp-json/wp/v2/posts?per_page=100`,
    initialData: props.articles
  })
  if (isLoading) {
    return (
      <h2>Loading...</h2>
    )
  }
  if (isError) {
    return (
      <>
      </>
    )
  }
  const topStory = articles.filter(article => {
    return article.categories[0] === 3
  })[0] || articles[0]

  const sideArticles = []
  const addToSide = (articles, cat) => {
    const newArticle = articles.filter(article => {
      return article.categories[0] === cat && article.id !== topStory.id
    })[0]
    if (newArticle) {
      sideArticles.push(newArticle)
    }
  }
  addToSide(articles, 3)
  addToSide(articles, 6)
  addToSide(articles, 8)
  addToSide(articles, 9)
  addToSide(articles, 4)


  const topStoryCat = categories.filter(category => {
    return category.id === topStory.categories[0]
  })[0]

  const onlyNews = articles.filter(article => {
    return (
      (
        article.categories.indexOf(3) !== -1
        &&
        article.id !== topStory.id
      )
    )
  })
  onlyNews.length = onlyNews.length > 6 ? 6 : onlyNews.length
  const newsArticles = onlyNews.map(article => {
    return (
      <React.Fragment key={article.id}>
        <NewsArticle
          summary
          article={article}
          category="News"
        />
        <div/>
        <style jsx>
          {
            `
              div {
                width: 100%;
                height: 2px;
                background: #edf0f1;
                margin-bottom: 14px;
              }
            `
          }
        </style>
      </React.Fragment>
    )
  })

  const onlySports = articles.filter(article => {
    return (
      article.categories.indexOf(6) !== -1
      &&
      article.id !== topStory.id
    )
  })
  onlyNews.length = onlyNews.length > 6 ? 6 : onlyNews.length
  onlySports.length = onlySports.length > 6 ? 6 : onlySports.length
  const sportsArticles = onlySports.map(article => {
    return (
      <React.Fragment key={article.id}>
        <NewsArticle
          summary
          article={article}
          category="Sports"
        />
        <div/>
        <style jsx>
          {
            `
              div {
                width: 100%;
                height: 2px;
                background: #edf0f1;
                margin-bottom: 14px;
              }
            `
          }
        </style>
      </React.Fragment>
    )
  })

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
        <div className="contents">
          <div className="ad-wrapper">
            <Ad
              class="adsbygoogle"
              style={{display: "block"}}
              slot="7834969863"
              format="auto"
              responsive="true"
            />
          </div>
          <StationMessage/>

          <div className="news-section">

            <SlideShow slides={props.slides}/>
            <NewsArticle topStory article={topStory} category={topStoryCat?.name}/>
            <div className="news-section__col">
              <h2 className="news-section__header news-section__header--news">News</h2>
              {newsArticles}
            </div>
            {/*            <Ad
              style={{display: "block"}}
              slot="8368186869"
              format="auto"
              responsive="true"
            />*/}
            <div className="news-section__col">
              <h2 className="news-section__header news-section__header--sports">Sports</h2>
              {sportsArticles}
            </div>
          </div>
          <SideBar articles={sideArticles} categories={props.categories}/>
        </div>
      </HomeLayout>
      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }

        .ad-wrapper {
          width: 75%;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 14px;
        }

        .contents {
          display: flex;
          max-width: 100%;
          box-sizing: border-box;
          width: 1600px;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-start;
          margin-left: auto;
          margin-right: auto;
        }

        .news-section {
          box-sizing: border-box;
          padding: 21px;
          max-width: 100%;
          width: 1060px;
          margin-right: 14px;
          display: flex;
          flex-wrap: wrap;
          flex-grow: 1;
        }

        .news-section__col {
          width: 300px;
          min-width: 45%;
          max-width: 100%;
          margin-left: auto;
          margin-right: auto;
        }

        .news-section__header--news {
          color: ${categoryColor['News']};
        }

        .news-section__header--sports {
          color: ${categoryColor['Sports']};
        }
      `}</style>
    </div>
  )
}

export async function getStaticProps() {
  try {
    const [promoRes, menuItems, categories, articles] = await Promise.all([
      fetch(`${baseUrl}/wp-json/wp/v2/promotions?_embed&per_page=100&order=asc`),
      fetcher(`${baseUrl}/wp-json/menus/v1/menus/main-navigation`),
      fetcher(`${baseUrl}/wp-json/wp/v2/categories`),
      fetcher(`${baseUrl}/wp-json/wp/v2/posts?per_page=100`)
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
          promotionInfo.image = promotion.meta_box.event_home_slide[0].sizes.large?.url
          promotionInfo.imageWidth = promotion.meta_box.event_home_slide[0].sizes.large?.width
          promotionInfo.imageHeight = promotion.meta_box.event_home_slide[0].sizes.large?.height
        }

        if (promotion.meta_box.event_square_image && promotion.meta_box.event_square_image[0]) {
          promotionInfo.smallImage = promotion.meta_box.event_square_image[0].full_url
        }

        promotionInfo.showOnSlider = !!parseInt(promotion.meta_box.event_show_on_home_page)
        promotionInfo.showBelowSlider = !!parseInt(promotion.meta_box.event_show_below_slider)
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
      },
      revalidate: 5
    }
  } catch (e) {
    console.log(e)
    return {props: {}}
  }
}


export default Home
