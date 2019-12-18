import React, {useCallback, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import Parser from "rss-parser"
import NewsFeed from "./NewsFeed"

const NewsFeedContainer = props => {
  const dispatch = useDispatch()
  /*  const addCountryItems = useCallback(newsItems => dispatch({
    type: 'ADD_LOCAL_NEWS',
    data: newsItems
  }))*/
  const addLocalItems = useCallback(newsItems => dispatch({
    type: 'ADD_LOCAL_NEWS',
    data: newsItems
  }))
  useEffect(() => {
    async function getLocalItems() {
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

      addLocalItems(kbhbFeed)
    }

    getLocalItems()
  }, [])

  const newsItems = useSelector(state => state.newsItems)
  if(newsItems.localNews === null){
    return (
      <h2>
        Loading
      </h2>
    )
  }

  return (
    <NewsFeed items={newsItems.localNews.items}/>
  )
}

export default NewsFeedContainer