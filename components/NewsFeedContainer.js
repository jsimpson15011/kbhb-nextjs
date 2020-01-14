import React, {useCallback, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import Parser from "rss-parser"
import LocalNewsFeed from "./LocalNewsFeed"
import MusicNewsFeed from "./MusicNewsFeed"
import {newsUrl} from "../site-settings"

const NewsFeedContainer = props => {
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
  const dispatch = useDispatch()
  /*  const addCountryItems = useCallback(newsItems => dispatch({
    type: 'ADD_LOCAL_NEWS',
    data: newsItems
  }))*/
  const addLocalItems = useCallback(newsItems => dispatch({
    type: 'ADD_LOCAL_NEWS',
    data: newsItems
  }))

  const addMusicItems = useCallback(newsItems => dispatch({
    type: 'ADD_MUSIC_NEWS',
    data: newsItems
  }))
  useEffect(() => {
    async function getNewsItems() {
      const kbhbParser = new Parser({
        customFields: {
          item: [
            ['image', 'image']
          ]
          ,
        }
      })

      const countryParser = new Parser({
        customFields: {
          item: [
            ['media:group', "media:group", {keepArray: true}]
          ]
        }
      })

      const kbhbFeed = await kbhbParser.parseURL('https://kbhbradio.com/rss.php')

      const countryFeed = await countryParser.parseURL(CORS_PROXY + newsUrl)

      countryFeed.items.length = 3

      kbhbFeed.items.length = 3

      addLocalItems(kbhbFeed)
      addMusicItems(countryFeed)
    }

    getNewsItems()
  }, [])

  const newsItems = useSelector(state => state.newsItems)
  if (newsItems.localNews === null || newsItems.musicNews === null) {
    return (
      <h2>
        Loading
      </h2>
    )
  }

  return (
    <>
      <MusicNewsFeed items={newsItems.musicNews.items}/>
      <LocalNewsFeed items={newsItems.localNews.items}/>
    </>
  )
}

export default NewsFeedContainer