import React, {useCallback, useEffect, useState} from 'react'
import Head from "next/head"
import MainLayout from "../../../components/MainLayout"
import {metaDescription, siteTitle} from "../../../site-settings"
import LocalNewsFeed from "../../../components/LocalNewsFeed"
import newsHelpers from "../../../utils/newsHelpers"
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux"
import mainTheme from "../../../styles/katTheme"


const LocalNewsPage = props => {

  const dispatch = useDispatch()
  const [loadingButtonText, setLoadingButtonText] = useState("Load More")
  const [numberOfNewsItems, setNumberOfNewsItems] = useState(6)
  const addLocalItems = useCallback(newsItems => dispatch({
    type: 'ADD_LOCAL_NEWS',
    data: newsItems
  }))
  useEffect(() => {
    newsHelpers.getNewsItems(numberOfNewsItems).then(
      items => {
        addLocalItems(items.kbhbFeed)
      }
    )
  }, [])


  const handleClick = (e) => {
    setLoadingButtonText("Please Wait. Loading...")
    setNumberOfNewsItems(numberOfNewsItems + 3)
    newsHelpers.getNewsItems(numberOfNewsItems + 3).then(
      items => {
        addLocalItems(items.kbhbFeed)
        setLoadingButtonText(newsItems.localNews.items[newsItems.localNews.items.length - 1] ? "Load More" : "End of results")
      }
    )

  }

  const newsItems = useSelector(state => state.newsItems)
  if (newsItems.localNews === null) {
    return (
      <div>
        <Head>
          <title>{siteTitle} - Local News</title>
          <link rel='icon' href='/favicon.ico'/>
          <meta name="description"
                content={`${metaDescription}`}/>
        </Head>
        <MainLayout>
          Loading...
        </MainLayout>
      </div>
    )
  }

  return (

      <div>
        <Head>
          <title>{siteTitle} - Local News</title>
          <link rel='icon' href='/favicon.ico'/>
          <meta name="description"
                content={`${metaDescription}`}/>
        </Head>
        <MainLayout>
          <LocalNewsFeed items={newsItems.localNews.items}/>
          <button onClick={() => handleClick()}>{loadingButtonText}</button>
        </MainLayout>
        <style jsx>
          {`button{
padding: .5rem 1rem;
display: block;
font-size: 1.4em;
border: ${mainTheme.brand} solid 2px;
font-weight: bold;

}`}
        </style>
      </div>

  )
}

export default LocalNewsPage
