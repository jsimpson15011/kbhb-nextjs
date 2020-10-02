import React from "react"
import {withRedux} from "../lib/redux"
import {useSelector} from "react-redux"
import Link from "next/link"
import mainTheme from "../styles/katTheme"

const Announcements = () => {
  const announcementItems = useSelector(state => state.announcements.announcementItems)
  if (announcementItems === null) {
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
        announcementItems.announcements.length ?
          <Link href={`announcement`}>
            <a>Announcements</a>
          </Link> :
          ''
      }
      {
        announcementItems.closures.length ?
          <Link href={'cancellations'}>
            <a>COVID-19 Updates</a>
          </Link> :
          ''
      }
      {
        announcementItems.restaurantItems.length ?
          <Link href={'restaurant-info'}>
            <a>Restaurants</a>
          </Link> :
          ''
      }

      <style jsx>
        {`            
            .outer-wrapper{
              box-sizing: border-box;
              padding-right: 14px;
              max-width: 100%;
              z-index: 2;
              margin-left: auto;
              display: flex;
              flex-wrap: wrap;
              left: 0;
              bottom: 0;
              transform: translateY(100%);
              position: absolute;
            }    
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
