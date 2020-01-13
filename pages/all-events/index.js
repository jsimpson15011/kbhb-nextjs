import React from 'react'
import fetch from "isomorphic-unfetch"
import Head from "next/head"
import EventList from "../../components/EventList"
import MainLayout from "../../components/MainLayout"
import {activeItemsOnly, sortItems} from "../../utils/eventHelpers"
import {baseUrl, metaDescription, siteTitle} from "../../site-settings"

const Concerts = props => {

  return (
    <div>
      <Head>
        <title>{siteTitle} - Concerts</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta
          name="description"
          content={`${metaDescription}`}
        />
      </Head>
      <MainLayout>
        <h2>All Promotions</h2>
        <EventList category='concerts' events={props.events}/>
      </MainLayout>
    </div>
  )
}

Concerts.getInitialProps = async () => {
  const [promoRes, concertRes, remoteRes] = await Promise.all([
    fetch(`${baseUrl}/wp-json/wp/v2/promotions?_embed`),
    fetch(`${baseUrl}/wp-json/wp/v2/concerts?_embed`),
    fetch(`${baseUrl}/wp-json/wp/v2/remote_events?_embed`)
  ])
  const [promoData, concertData, remoteData] = await Promise.all([
    promoRes.json(),
    concertRes.json(),
    remoteRes.json()
  ])
  const combinedEventsData = [].concat(promoData, concertData, remoteData)

  const itemsFilteredByActive = activeItemsOnly(combinedEventsData)

  const eventsSortedByPublishDate = itemsFilteredByActive.sort((a, b) => {
    const timeA = new Date(a.date).getTime()
    const timeB = new Date(b.date).getTime()
    return timeB - timeA
  })

  const sortedEventsData = eventsSortedByPublishDate.sort((a, b) => {
    return a.meta_box.event_priority - b.meta_box.event_priority
  })

  return (
    {events: sortedEventsData}
  )
}

export default Concerts