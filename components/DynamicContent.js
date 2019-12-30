import React from "react"
import ReactHtmlParser from "react-html-parser"
import mainTheme from "../styles/katTheme"

const DynamicContent = props => {
  const featuredImage = props.content.featured_media ?
    props.content._embedded['wp:featuredmedia'][0].source_url
    : ''
  const squareImage = props.content.meta_box.event_square_image && props.content.meta_box.event_square_image[0] ?
    //We check if these properties exist on the content and if the property contains an image. We have to check both because the staff doesn't have these properties
    props.content.meta_box.event_square_image[0].full_url
    : ''
  const slideImage = props.content.meta_box.event_home_slide && props.content.meta_box.event_home_slide[0] ?
    props.content.meta_box.event_home_slide[0].full_url
    : ''

  return (
    <>
      {
        squareImage && !featuredImage && !slideImage ?
          <img className="square-image"
               src={squareImage} alt=""/>
          : ''
      }

      <h2>
        {ReactHtmlParser(props.content.title.rendered)}
      </h2>

      {
        featuredImage ?
          <img className="banner" src={featuredImage} alt=""/>
          : ''
      }

      {
        slideImage && !featuredImage ?
          <img className="banner" src={slideImage} alt=""/>
          : ''
      }

      <div className="content">
        {ReactHtmlParser(props.content.content.rendered)}
      </div>
      <style jsx global>
        {`
          .content a{
            color: black;
            font-weight: bold;
          }
          .content .contact-container{
            margin-bottom: 14px;
            background: white;
            padding: 14px;
            box-sizing: border-box;
            border-left: ${mainTheme.brand} solid 7px;
            box-shadow: #d6d1d3 2px 2px 2px;
          }
        `}
      </style>
      <style jsx>
        {`
          .banner{
            width: 100%;
            margin-bottom: 14px;
          }
          .square-image{
            display: block;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 14px;
          }
          .content{
            background: #eeeeee;
            margin: 21px;
            color: #160303;
            padding: 14px;
            box-sizing: border-box;
            width: 100%;
            border-left: ${mainTheme.brand} solid 7px;
          }
        `}
      </style>
    </>
  )
}

export default DynamicContent