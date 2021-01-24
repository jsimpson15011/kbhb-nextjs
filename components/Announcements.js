import React from "react"
import {withRedux} from "../lib/redux"
import Link from "next/link"
import mainTheme from "../styles/katTheme"
import {useAnnouncements, useClosures} from "../utils/cachedData"

const Announcements = () => {
  const {announcementItems, isLoading, isError} = useAnnouncements()
  const {closureItems , closureIsLoading} = useClosures("https://psa.homesliceweb.com/wp-json/wp/v2/closures")

  if (isLoading || closureIsLoading || !closureItems) {
    return (
      <>
      <div style={{width: "100%", height: 43}}/>
      </>
    )
  }
  if (isError){
    console.log(isError)
    return (
      <></>
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
        announcementItems.length ?
          <Link href={`/announcement`}>
            <a>Announcements</a>
          </Link> :
          ''
      }
      {
        closureItems.length ?
          <Link href={'/cancellations'}>
            <a>COVID-19 Updates</a>
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
            .outer-wrapper{
              box-sizing: border-box;
              padding-right: 14px;
              max-width: 100%;
              z-index: 2;
              display: flex;
              flex-wrap: wrap;
            }    
            /*@media all and (min-width: 1217px){
              .outer-wrapper{
                position: absolute;
              }
            }*/
            a{
              background: ${mainTheme.background};
              padding: 7px;
              font-weight:bold;
              text-decoration: none;
              color: ${mainTheme.accent};
              filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.65));
              margin-left: 14px;
              margin-top: 7px;
            }
            a:hover, a:focus{
              background: ${mainTheme.accent};
              color: white;
            }
`}
      </style>
    </div>
  )
}

export default withRedux(Announcements)
