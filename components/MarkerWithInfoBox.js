import {Marker} from "react-google-maps"
import InfoBox from "react-google-maps/lib/components/addons/InfoBox"
import React, {useState} from "react"

const MarkerWithInfoBox = (props) => {
  const [open, toggleOpen] = useState(false)
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
        <div style={{background: '#f1f1f1', color: '#101010', padding: '7px'}}>
          <h2>{props.title}</h2>
          <p>{props.address1}</p>
          <p>{props.address2}</p>
        </div>
      </InfoBox>
      }

    </Marker>
  )
}

export default MarkerWithInfoBox