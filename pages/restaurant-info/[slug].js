import React from 'react'
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import DynamicContent from "../../components/DynamicContent"
import { siteTitle} from "../../site-settings"
import {useSelector} from "react-redux"

const Announcement = props => {
  const announcementItems = useSelector(state => state.announcements.announcementItems.restaurantItems)
  const currentItem = announcementItems.filter(item => {
    return item.slug === props.slug
  })[0]
  if (currentItem.length === 0){
    return (
      <></>
    )
  }
  console.log(currentItem)
  return (
    <MainLayout>
      <Head>
        <title>{siteTitle} - {currentItem.title.rendered}</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <DynamicContent content={currentItem}/>
    </MainLayout>
  )
}

Announcement.getInitialProps = async context => {
  const {slug} = context.query


  return {
    slug: slug
  }
}

export default Announcement