import React, {useCallback, useEffect} from 'react'
import fetch from 'isomorphic-unfetch'
import {useSelector, useDispatch} from "react-redux"
import {withRedux} from "../lib/redux"

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
    async function getNavigationItems() {
      const initialLinks = [{
        slug: '',
        url: '/',
        title: 'Home',
        type: 'initial'
      }]
      const navItemsRes = await fetch('https://katcms.homesliceweb.com/wp-json/menus/v1/menus/main-navigation')
      const navItemsData = await navItemsRes.json()

      getNavItems(initialLinks.concat(navItemsData.items))
    }

    getNavigationItems()
  }, [])

  const newsItems = useSelector(state => state.newsItems)

  return (
    <div>

    </div>
  )
}