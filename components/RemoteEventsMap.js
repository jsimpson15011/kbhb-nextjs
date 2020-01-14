import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps"
import MarkerWithInfoBox from "./MarkerWithInfoBox"

const RemoteEventsMap = withScriptjs(withGoogleMap((props) => {
    const averageLat = (props.markers.reduce((accumulator, currentValue) => {
      return (accumulator + currentValue.lat)
    }, 0)) / props.markers.length
    const averageLng = (props.markers.reduce((accumulator, currentValue) => {
      return (accumulator + currentValue.lng)
    }, 0)) / props.markers.length
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{lat: averageLat, lng: averageLng}}
      >
        {props.markers.map(marker =>{
            return(
              <MarkerWithInfoBox
                key={marker.lat + marker.lng}
                lat={marker.lat}
                lng={marker.lng}
                title="test"
                address1="test"
                address2="test"
              />
            )
          }
        )}
      </GoogleMap>
    )
  }
))

export default RemoteEventsMap