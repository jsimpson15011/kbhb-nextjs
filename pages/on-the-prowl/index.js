import React from 'react'
import fetch from "isomorphic-unfetch"
import Head from "next/head"
import EventList from "../../components/EventList"
import MainLayout from "../../components/MainLayout"
import {activeItemsOnly, sortItems} from "../../utils/eventHelpers"

const Promotions = props => {

  return (
    <div>
      <Head>
        <title>On The Prowl</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta name="description"
              content="KOUT “KAT COUNTRY”, The Black Hills’ Favorite Country station playing a mix of the best of popular country artists in an upbeat, contemporary style"/>
      </Head>
      <MainLayout>
        <h2>On The Prowl</h2>
        <EventList category={'on-the-prowl'} events={props.events}/>
      </MainLayout>
    </div>
  )
}

Promotions.getInitialProps = async () => {
  const eventRes = await fetch('https://katcms.homesliceweb.com/wp-json/wp/v2/remote_events')
  const eventData = await eventRes.json()

  const filteredEvents = activeItemsOnly(eventData)
  const sortedItems = sortItems(filteredEvents)

  return {
    events: sortedItems.map(event => event)
  }
}

export default Promotions