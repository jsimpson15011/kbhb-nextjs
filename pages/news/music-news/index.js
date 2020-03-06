import React, {useCallback, useEffect, useState} from 'react'
import Head from "next/head"
import MainLayout from "../../../components/MainLayout"
import {metaDescription, siteTitle} from "../../../site-settings"
import MusicNewsFeed from "../../../components/MusicNewsFeed"
import newsHelpers from "../../../utils/newsHelpers"
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux"


const MusicNewsPage = props => {

  const dispatch = useDispatch()
  const [loadingButtonText, setLoadingButtonText] = useState("Load More")
  const [numberOfNewsItems, setNumberOfNewsItems] = useState(3)
  const addMusicItems = useCallback(newsItems => dispatch({
    type: 'ADD_MUSIC_NEWS',
    data: newsItems
  }))
  useEffect(() => {
    newsHelpers.getNewsItems().then(
      items => {
        addMusicItems(items.musicNewsFeed)
      }
    )
  }, [])


  const handleClick = (e) => {
    setLoadingButtonText("Please Wait. Loading...")
    setNumberOfNewsItems(numberOfNewsItems + 3)
    newsHelpers.getNewsItems(numberOfNewsItems).then(
      items => {
        addMusicItems(items.musicNewsFeed)
        setLoadingButtonText("Load More")
      }
    )

  }

  const newsItems = useSelector(state => state.newsItems)
  if (newsItems.musicNews === null) {
    return (
      <div>
        <Head>
          <title>{siteTitle} - Interviews</title>
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
          <title>{siteTitle} - Interviews</title>
          <link rel='icon' href='/favicon.ico'/>
          <meta name="description"
                content={`${metaDescription}`}/>
        </Head>
        <MainLayout>
          <MusicNewsFeed items={newsItems.musicNews.items}/>
          <button onClick={() => handleClick()}>{loadingButtonText}</button>
        </MainLayout>
        <style jsx>
          {`button{
padding: .5rem 1rem;

}`}
        </style>
      </div>

  )
}

export default MusicNewsPage