import React, {useCallback, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import LocalNewsFeed from "./LocalNewsFeed"
import MusicNewsFeed from "./MusicNewsFeed"
import newsHelpers from "../utils/newsHelpers"
import Link from "next/link"
import mainTheme from "../styles/katTheme"

const NewsFeedContainer = () => {
  const dispatch = useDispatch()
  const addLocalItems = useCallback(newsItems => dispatch({
    type: 'ADD_LOCAL_NEWS',
    data: newsItems
  }))

  const addMusicItems = useCallback(newsItems => dispatch({
    type: 'ADD_MUSIC_NEWS',
    data: newsItems
  }))
  useEffect(() => {
    newsHelpers.getNewsItems().then(
      items => {
        addLocalItems(items.kbhbFeed)
        addMusicItems(items.musicNewsFeed)
      }
    )


  }, [])

  const newsItems = useSelector(state => state.newsItems)
  if (newsItems.localNews === null && newsItems.musicNews === null) {
    return (
      <h2>
        Loading
      </h2>
    )
  }

  if (newsItems.localNews === null && newsItems.musicNews){
    return(
        <MusicNewsFeed items={newsItems.musicNews.items}/>
      )
  }

  if (newsItems.musicNews === null && newsItems.localNews){
    return(
      <LocalNewsFeed items={newsItems.localNews.items}/>
    )
  }

  return (
    <>
      <MusicNewsFeed items={newsItems.musicNews.items}/>
      <Link href="/news/music-news">
        <a className="read-more-news">
          See More News Stories
        </a>
      </Link>
      <LocalNewsFeed items={newsItems.localNews.items}/>
      <Link href="/news/local-news">
        <a className="read-more-news">
          See More News Stories
        </a>
      </Link>
      <style global jsx>
        {`
a > span{
  color: white;
}
      .read-more-news{
        background: #f3f3f3;
        border: ${mainTheme.brand} solid 4px;
        padding: 7px;
        box-sizing: border-box;
        font-weight: bold;
        text-decoration: none;
        color: #100f0f;
        display: block;
        text-align: center;
        margin-bottom: 21px;
      }
`}
      </style>
    </>
  )
}

export default NewsFeedContainer
