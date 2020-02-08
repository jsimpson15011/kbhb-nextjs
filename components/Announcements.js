import React from "react"
import {withRedux} from "../lib/redux"
import {useSelector} from "react-redux"
import Link from "next/link"

const Announcements = () => {
  const announcementItems = useSelector(state => state.announcements.announcementItems)
  if (announcementItems === null || announcementItems.length === 0) {
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
            <a>Closings and Delays</a>
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
    position: absolute;
    right: 0;
            }
            a{
              background: white;
              border-top: solid black 1px;
              padding: 7px;
              font-weight:bold;
              text-decoration: none;
              color: black;
              margin-left: 14px;
            }
            a:hover, a:focus{
              background: #ab0000;
              color: white;
            }
`}
      </style>
    </div>
  )
}

export default withRedux(Announcements)