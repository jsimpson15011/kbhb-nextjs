import React from "react"
import mainTheme from "../styles/katTheme"
import {listenLiveUrl} from "../site-settings"
import ReactHtmlParser from "react-html-parser"
import {useSchedule} from "../utils/cachedData"

const LiveSchedule = () => {
  const {data, isLoading, isError} = useSchedule()

  if (isLoading && !isError) {
    return (
      <></>
    )
  }
  if (data.length === 0) {
    return (
      <></>
    )
  }

  return (
    <a href={`${listenLiveUrl}/#listen-live`} className="listen-live">
      {
        data[0].meta_box.schedule_square_image[0] ?
          <div className="image-wrapper">
            <img className='listen-live__personality-image' alt=''
                 src={data[0].meta_box.schedule_square_image[0].full_url}/>
          </div>  :
          ''
      }
      <img alt='' src='/img/sound-wave.png' className="listen-live__icon"/>
        <div className="listen-live__text">
          <h3>Listen Live</h3>
          <p>
            <b>{ReactHtmlParser(data[0].title.rendered)}</b> {data[0].meta_box.schedule_start_time} - {data[0].meta_box.schedule_end_time}
          </p>
        </div>
      <style jsx>
        {`
          .listen-live{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            background: ${mainTheme.background};
            color: ${mainTheme.accent};
            text-decoration: none;
            border-bottom-right-radius: 21px;
            border-top-right-radius: 21px;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.65));
          }
          .image-wrapper{
            align-self: stretch;
            width: 95px;
          }
          .listen-live__personality-image{
            min-height: 100%;
            width: 100%;
            height: auto;
          }
          .listen-live__icon{
            margin-left: 21px;
            display: none;
          }

          .listen-live__text{
            margin-left: 21px;
            padding-top: 7px;
            flex-shrink: 0;
            font-size: .7rem;
          }
          
          h3{
            font-weight: bold;
            font-size: 2.3em;
            margin-bottom: 0;
          }
          p{
            margin-right: 21px;
            margin-bottom: 7px;
          }
          
          @media all and (min-width: 550px){
            .listen-live__icon{
              display: block;
            }
            p{
              margin-left: 21px;
            }
            .listen-live__text{
              font-size: 1rem;
            }
          }
        `}
      </style>
    </a>

  )
}

export default LiveSchedule
