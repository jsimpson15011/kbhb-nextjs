import React from 'react'
import {useWeather} from "../utils/cachedData"
import Link from "../utils/ActiveLink"

const Weather = props => {
  const {weather, isLoading, isError} = useWeather()

  if (isLoading) {
    return (
      <div>
        Loading Please Wait
      </div>
    )
  }
  if (isError || !weather.properties) {
    return (
      <></>
    )
  }

  let forecastIndex = 0
  weather.properties.periods.length = props.sidebar ? 6 : weather.properties.periods.length
  const forecast = weather.properties.periods.map(item => {
      forecastIndex += 1
      return (
        <React.Fragment key={item.name}>
          {
            forecastIndex % 2 !== 0 && forecastIndex !== 1 ?
              <div className="day-divider"/>
              : ""
          }
          <div key={item.name} className="container">
            <h2>{item.name}</h2>

            <div className="content">
              <div className="icon-temp">
                <img src={item.icon} alt={item.shortForecast}/>
                <span className="temp">{item.temperature}°F</span>
              </div>
              {
                !props.sidebar ?
                  <span className="forecast">{item.detailedForecast}</span> :
                  ""
              }

            </div>
          </div>
          {
            forecastIndex === weather.properties.periods.length ?
              <div className="day-divider"/> :
              ""
          }
          <style jsx>
            {
              `
                .container{
                  width: 200px;
                  min-width: 15%;
                  padding-bottom: 7px;
                  max-width:${
                props.sidebar ? "49%" : "100%"
              }; 
                  background: #dcebef;
                }
                .day-divider{
                  background: #95afba;
                  width: 1px;
                }
                .content{
                  background: #f3f7fa;
                  border-radius: 7px;
                  overflow: hidden;
                  padding-right: 7px;
                  /*height: 145px;*/
                  display: flex;
                  flex-direction: column;
                  flex-grow: 1;
                  margin-right: 7px;
                  margin-left: 7px;
                }
                h2{
                  font-size: ${
                props.sidebar ? ".9rem" : "1.2rem"
              }; 
                  text-align: center;
                  margin-top: 0;
                  margin-bottom: 7px;
                  background: #163858;
                  color: white;
                  font-weight: normal;
                }
                .icon-temp{
                  display: flex;
                  align-items: center;
                  font-size: ${
                props.sidebar ? "1rem" : "2rem"
              }; 
                  font-weight: bold;
                }
                img{
                  margin-right: 14px;
                  max-width: 50%;
                }
                .forecast{
                  margin-top: auto;
                  /*text-align: center;*/
                  display: block;
                  padding: 7px;
                }
`
            }
          </style>
        </React.Fragment>
      )
    }
  )


  return (
    <div>
      {forecast}
      {
        props.sidebar ?
          <Link href={`/weather`}>
            <a>
              View Full Forecast
            </a>
          </Link>
          : ""
      }
      <style jsx>
        {
          `
            div{
              margin-bottom: 21px;
              display: flex;
              flex-wrap: wrap;
              width: ${
            props.sidebar ? "300px" : "auto"
          };
            }
            a{
              text-decoration: none;
              background: #3B73B1;
              color: white;
              font-size: 1.1rem;
              padding: 5px 0;
              width: 200px;
              max-width: 100%;
              display: block;
              text-align: center;
              font-family: 'Montserrat',sans-serif;
              text-transform: uppercase;
              letter-spacing: 2px;
              border-radius: 7px;
              margin: 14px auto;
              transition: background-color .2s, color .2s;
              border: transparent 2px solid;
            }
            a:hover, a:focus{
              background: white;
              color: #3B73B1;
              border: #3B73B1 2px solid;
            }
`
        }
      </style>
    </div>
  )
}

export default Weather