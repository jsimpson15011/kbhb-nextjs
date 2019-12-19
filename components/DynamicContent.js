import React from "react"
import ReactHtmlParser from "react-html-parser"

const DynamicContent = props => {
  const featuredImage = props.content.featured_media ?
    props.content._embedded['wp:featuredmedia'][0].source_url
    : ''
  const squareImage = props.content.meta_box.event_square_image ?
    props.content.meta_box.event_home_slide[0].full_url
    : ''
  const slideImage = props.content.meta_box.event_home_slide ?
    props.content.meta_box.event_home_slide[0].full_url
    : ''

  return (
    <div>
      {
        squareImage && !featuredImage && !slideImage ?
          <img className="square-image"
               src="https://katcms.homesliceweb.com/wp-content/uploads/2019/12/roaring-300x250kat.jpg" alt=""/>
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
          }
        `}
      </style>
    </div>
  )
}

export default DynamicContent