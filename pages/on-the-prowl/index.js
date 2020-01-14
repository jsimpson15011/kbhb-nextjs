import React from 'react'
import fetch from "isomorphic-unfetch"
import Head from "next/head"
import EventList from "../../components/EventList"
import MainLayout from "../../components/MainLayout"
import RemoteEventsMap from "../../components/RemoteEventsMap"
import {activeItemsOnly, sortItems} from "../../utils/eventHelpers"
import {baseUrl, metaDescription, siteTitle, remoteEventsName} from "../../site-settings"

const RemoteEvents = props => {
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
                        markers={[{lat: 44.08054, lng: -103.23101}, {lat: 44.0741088, lng: -103.2345662}]}
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