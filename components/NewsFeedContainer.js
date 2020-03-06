import React, {useCallback, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import LocalNewsFeed from "./LocalNewsFeed"
import MusicNewsFeed from "./MusicNewsFeed"
import newsHelpers from "../utils/newsHelpers"

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
      <LocalNewsFeed items={newsItems.localNews.items}/>
      <style global jsx>
        {`
a > span{
  color: white;
}
`}
      </style>
    </>
  )
}

export default NewsFeedContainer