import React from "react"
import {withRedux} from "../lib/redux"
import Link from "next/link"
import { useClosures} from "../utils/cachedData"

const ClosureNotification = () => {
  const {closureItems , closureIsLoading} = useClosures("https://psa.homesliceweb.com/wp-json/wp/v2/closures")

  if (closureIsLoading || !closureItems) {
    return (
      <>
        <div style={{width: "100%", height: 43}}/>
      </>
    )
  }
  /*  const announcementList = announcementItems.map(announcement => {
      return (
        <div key={announcement.slug}>
          <Link href={`announcement/${announcement.slug}`}>
            <a>{announcement.title.rendered}</a>
          </Link>
          <style jsx>
            {`
              a{
                color: white;
              }
            `}
          </style>
        </div>
      )
    })*/
  return (
    <div className="outer-wrapper">
      {
        closureItems.length ?
          <Link href={'/cancellations'}>
            <a>{closureItems[0].title.rendered}</a>
          </Link> :
          ''
      }
      {/*      {
        announcementItems.restaurantItems.length ?
          <Link href={'restaurant-info'}>
            <a>Restaurants</a>
          </Link> :
          ''
      }*/}

      <style jsx>
        {`
          .outer-wrapper {
            box-sizing: border-box;
            width: 100%;
            z-index: 2;
            display: flex;
            flex-wrap: wrap;
          }

          /*@media all and (min-width: 1217px){
            .outer-wrapper{
              position: absolute;
            }
          }*/
          a {
            background: #b70b0b;
            padding: 7px;
            font-weight: bold;
            font-size: 1.5em;
            text-decoration: none;
            color: white;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.65));
            margin: auto;
          }

          a:hover, a:focus {
            background: #d40d0d;
            color: white;
          }
        `}
      </style>
    </div>
  )
}

export default withRedux(ClosureNotification)