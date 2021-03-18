import React from "react"
import mainTheme from "../styles/katTheme"
import {listenLiveUrl} from "../site-settings"
import ReactHtmlParser from "react-html-parser"
import {useSchedule} from "../utils/cachedData"
import Image from "next/image"

const LiveSchedule = () => {
  const {data, isLoading, isError} = useSchedule()

  if (isLoading && !isError) {
    return (
      <a href={`${listenLiveUrl}`} className="listen-live">
        <div className="personality-placeholder"/>
        <Image width={79} height={79} alt='' src='/img/sound-wave.png' className="listen-live__icon"/>
        <div className="listen-live__text">
          <h3>Listen Live</h3>
          <p>
            <b>Big 81 Ranch Radio KBHB</b>
          </p>
        </div>
        <style jsx>
          {`
            .listen-live {
              align-items: center;
              background: ${mainTheme.background};
              color: ${mainTheme.accent};
              text-decoration: none;
              border-bottom-right-radius: 21px;
              border-top-right-radius: 21px;
              filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.65));
              height: 95px;
              display: none;
            }

            .personality-placeholder {
              width: 95px;
              height: 95px;
            }

            .image-wrapper {
              align-self: stretch;
              width: 95px;
              margin-right: 7px;
            }

            .listen-live__personality-image {
              min-height: 100%;
              width: 100%;
              height: auto;
            }

            .listen-live__icon {
              margin-left: 21px;
              display: none;
            }

            .listen-live__text {
              margin-left: 21px;
              padding-top: 7px;
              flex-shrink: 0;
              font-size: .7rem;
            }

            h3 {
              font-weight: bold;
              font-size: 2.3em;
              margin-bottom: 0;
            }

            p {
              margin-right: 21px;
              margin-bottom: 7px;
            }

            @media all and (min-width: 550px) {
              .listen-live__icon {
                display: block;
              }

              p {
                margin-left: 21px;
              }

              .listen-live__text {
                font-size: 1rem;
              }
            }

            @media all and (min-width: ${mainTheme.menuBreakPoint}) {
              .listen-live {
                display: flex;
              }
            }
          `}
        </style>
      </a>
    )
  }
  if (data.length === 0) {
    return (
      <></>
    )
  }
  return (
    <a href={`${listenLiveUrl}`} className="listen-live">
      {
        data[0].meta_box.schedule_square_image[0] ?
          <div className="image-wrapper">
            <Image className='listen-live__personality-image' alt=''
                   width={data[0].meta_box.schedule_square_image[0].width}
                   height={data[0].meta_box.schedule_square_image[0].height}
                   src={data[0].meta_box.schedule_square_image[0].full_url}
                   layout="responsive"
            />
          </div> :
          ''
      }
      <Image width={79} height={79} alt='' src='/img/sound-wave.png' className="listen-live__icon"/>
      <div className="listen-live__text">
        <h3>Listen Live</h3>
        <p>
          <b>{ReactHtmlParser(data[0].title.rendered)}</b> {data[0].meta_box.schedule_start_time} - {data[0].meta_box.schedule_end_time}
        </p>
      </div>
      <style jsx>
        {`
          .listen-live {
            align-items: center;
            background: ${mainTheme.background};
            color: ${mainTheme.accent};
            text-decoration: none;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.65));
            display: none;
          }

          @media all and (min-width: 616px) {
            .listen-live {
              border-bottom-right-radius: 21px;
              border-top-right-radius: 21px;
            }
          }

          .image-wrapper {
            align-self: stretch;
            width: 95px;
            margin-right: 7px;
          }

          .listen-live__personality-image {
            min-height: 100%;
            width: 100%;
            height: auto;
          }

          .listen-live__icon {
            margin-left: 21px;
            display: none;
          }

          .listen-live__text {
            margin-left: 21px;
            padding-top: 7px;
            flex-shrink: 0;
            font-size: .7rem;
          }

          h3 {
            font-weight: bold;
            font-size: 2.3em;
            margin-bottom: 0;
          }

          p {
            margin-right: 21px;
            margin-bottom: 7px;
          }

          @media all and (min-width: 550px) {
            .listen-live__icon {
              display: block;
            }

            p {
              margin-left: 21px;
            }

            .listen-live__text {
              font-size: 1rem;
            }
          }

          @media all and (min-width: ${mainTheme.menuBreakPoint}) {
            .listen-live {
              display: flex;
            }
          }
        `}
      </style>
    </a>

  )
}

export default LiveSchedule
