import React from 'react'
import fetch from "isomorphic-unfetch"
import Head from "next/head"
import EventList from "../../components/EventList"
import MainLayout from "../../components/MainLayout"
import RemoteEventsMap from "../../components/RemoteEventsMap"
import {activeItemsOnly, formatDate, sortItems} from "../../utils/eventHelpers"
import {baseUrl, metaDescription, siteTitle, remoteEventsName} from "../../site-settings"

const RemoteEvents = props => {
  if (props.events.length === 0){
    return (
      <div>
        <Head>
          <title>{siteTitle} - On The Prowl</title>
          <link rel='icon' href='/favicon.ico'/>
          <meta name="description"
                content={`${metaDescription}`}/>
        </Head>
        <MainLayout>
          <h2>{remoteEventsName}</h2>
          <h3 style={{width:'100%'}}>There are no events at this time, but check back soon</h3>
        </MainLayout>
      </div>
    )
  }


  const markersArray = props.events.map(event => {
    return (
      {
        lat: parseFloat(event.meta_box.lat),
        lng: parseFloat(event.meta_box.lng),
        title: event.title.rendered,
        address: event.meta_box.address,
        time: formatDate(event.meta_box.event_event_date_time)
      }
      )
  })
  return (
    <div>
      <Head>
        <title>{siteTitle} - On The Prowl</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta name="description"
              content={`${metaDescription}`}/>
      </Head>
      <MainLayout>
        <h2>{remoteEventsName}</h2>
        <RemoteEventsMap isMarkerShown
                         markers={
                           markersArray
                         }
                         googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDB3rRoYScI_u82_AL2dHiVSv2cI3v_c_w&v=3.exp&libraries=geometry,drawing,places"
                         loadingElement={<div style={{height: `100%`}}/>}
                         containerElement={<div style={{height: `600px`, width: `100%`}}/>}
                         mapElement={
                           <div
                             style={{height: `100%`, width: `100%`}}
                           />
                         }
        />
        <EventList category={'on-the-prowl'} events={props.events}/>
      </MainLayout>
    </div>
  )
}

RemoteEvents.getInitialProps = async () => {
  const eventRes = await fetch(`${baseUrl}/wp-json/wp/v2/remote_events?per_page=100`)
  const eventData = await eventRes.json()

  const filteredEvents = activeItemsOnly(eventData)
  const sortedItems = sortItems(filteredEvents)

  return {
    events: sortedItems.map(event => event)
  }
}

export default RemoteEvents