import {Marker} from "react-google-maps"
import InfoBox from "react-google-maps/lib/components/addons/InfoBox"
import React, {useState} from "react"

const MarkerWithInfoBox = (props) => {
  const [open, toggleOpen] = useState(false)
  console.log(props)
  return (
    <Marker icon="/img/map-icon.png"
            position={{lat: props.lat, lng: props.lng}}
            onClick={() => {
              toggleOpen(!open)
            }}>
      {open &&
      <InfoBox
        defaultPosition={new google.maps.LatLng(props.lat, props.lng)}
        options={{closeBoxURL: ``, enableEventPropagation: true}}
      >
        <div style={{background: '#f8f8f8', color: '#212121', padding: '7px'}}>
          <h2>{props.title}</h2>
          <h3>{props.time}</h3>
          <h4>{props.address}</h4>
        </div>
      </InfoBox>
      }

    </Marker>
  )
}

export default MarkerWithInfoBox