import React from 'react'
import fetch from "isomorphic-unfetch"
import Head from "next/head"
import EventList from "../../components/EventList"
import MainLayout from "../../components/MainLayout"
import {activeItemsOnly, sortItems} from "../../utils/eventHelpers"
import {baseUrl, metaDescription, siteTitle} from "../../site-settings"

const Promotions = props => {

  return (
    <div>
      <Head>
        <title>{siteTitle} - On The Prowl</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta name="description"
              content={`${metaDescription}`}/>
      </Head>
      <MainLayout>
        <h2>On The Prowl</h2>
        <EventList category={'on-the-prowl'} events={props.events}/>
      </MainLayout>
    </div>
  )
}

Promotions.getInitialProps = async () => {
  const eventRes = await fetch(`${baseUrl}/wp-json/wp/v2/remote_events?per_page=100`)
  const eventData = await eventRes.json()

  const filteredEvents = activeItemsOnly(eventData)
  const sortedItems = sortItems(filteredEvents)

  return {
    events: sortedItems.map(event => event)
  }
}

export default Promotions