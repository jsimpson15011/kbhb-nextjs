import React from 'react'
import fetch from "isomorphic-unfetch"
import Head from "next/head"
import EventList from "../../components/EventList"
import MainLayout from "../../components/MainLayout"
import {activeItemsOnly, sortItems} from "../../utils/eventHelpers"
import {baseUrl, siteTitle} from "../../site-settings"

const Concerts = props => {

  return (
    <div>
      <Head>
        <title>{siteTitle} - Concerts</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta name="description"
              content="KOUT “KAT COUNTRY”, The Black Hills’ Favorite Country station playing a mix of the best of popular country artists in an upbeat, contemporary style"/>
      </Head>
      <MainLayout>
        <h2>Concerts</h2>
        <EventList category={'concerts'} events={props.events}/>
      </MainLayout>
    </div>
  )
}

Concerts.getInitialProps = async () => {
  const eventRes = await fetch(`${baseUrl}/wp-json/wp/v2/concerts?per_page=100`)
  const eventData = await eventRes.json()

  const filteredEvents = activeItemsOnly(eventData)
  const sortedItems = sortItems(filteredEvents)

  return {
    events: sortedItems.map(event => event)
  }
}

export default Concerts