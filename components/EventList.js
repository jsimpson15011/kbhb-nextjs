import React from "react"
import ReactHtmlParser from "react-html-parser"
import Link from "next/link"
import mainTheme from "../styles/katTheme"

const EventList = props => {
  const eventLinks = props.events.map(event => {
    const externalLink = event.meta_box.event_external_link

    const squareImage = event.meta_box.event_square_image[0] ?
      event.meta_box.event_square_image[0].full_url
      : ''
    const slideImage = event.meta_box.event_home_slide[0] ?
      event.meta_box.event_home_slide[0].full_url
      : ''

    return (
      <div className="event-container" key={event.slug}>

        {
          squareImage && !slideImage ?
            <img src={squareImage} alt=""/>
            : ''
        }
        {
          slideImage ?
            <img src={slideImage} alt=""/>
            : ''
        }
        {
          externalLink ?
            <a href={externalLink}>
              {ReactHtmlParser(event.title.rendered)}
            </a>
            : <Link href={`/${props.category}/${event.slug}`}>
              <a>
                {ReactHtmlParser(event.title.rendered)}
              </a>
            </Link>
        }
        <style jsx>
          {`
            a{
              font-size: 1.5em;
              color: #dddddd;
              background: #231F20;
              text-decoration: none;
              padding: 7px;
              box-shadow: #303030 3px 3px 3px;
              margin-left: 7px;
              width: 100%;
              text-align: center;
            }
            img{
              margin-bottom: 14px;
            }
            a:focus, a:hover{
              box-shadow: #575757 1px 1px 2px;
            }
            a:active{
              box-shadow: #575757 0 0 2px;
            }
            .event-container{
              box-sizing: border-box;
              margin-bottom: 21px;
              background: #f4f4f4;
              border-left: ${mainTheme.brand} solid 10.5px;
              padding: 14px;
              display: flex;
              flex-wrap: wrap;
              align-items: flex-start;
              width: 100%;
              justify-content: space-around;
            }
          `}
        </style>
      </div>
    )
  })

  return (
    <>
      <nav>
        {eventLinks}
      </nav>
      <style jsx>
        {`
          nav{
            width: 100%;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default EventList