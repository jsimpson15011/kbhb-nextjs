import React from 'react'
import fetch from "isomorphic-unfetch"
import Head from "next/head"
import EventList from "../../components/EventList"
import MainLayout from "../../components/MainLayout"
import {activeItemsOnly, sortItems} from "../../utils/eventHelpers"
import {baseUrl, metaDescription, siteTitle} from "../../site-settings"

import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel"

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  console.log(props)
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{lat: 44.08054, lng: -103.23101}}
      >
        {props.markers.map(marker => <Marker key={marker.lat+marker.lng} position={{lat: marker.lat, lng: marker.lng}}/>)}
        <MarkerWithLabel
          position={{lat: -34.397, lng: 150.644}}
          labelAnchor={new google.maps.Point(0, 0)}
          labelStyle={{backgroundColor: "white", fontSize: "16px", padding: "16px"}}
        >
          <h2>Test</h2>
        </MarkerWithLabel>
      </GoogleMap>
    )
  }
))

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
        <MyMapComponent isMarkerShown
                        markers={[{lat: 44.08054, lng: -103.23101},{lat: 40, lng: -109}]}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDB3rRoYScI_u82_AL2dHiVSv2cI3v_c_w&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `400px`}}/>}
                        mapElement={<div style={{height: `100%`, width: `400px`}}

                        />}
        />
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