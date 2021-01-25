import React from 'react'
import Link from "next/link"
import Image from "next/image"
import {articleDate, categoryColor} from "../utils/articleFunctions"

const NewsArticle = (props) => {

  if (props.topStory) {
    const mainImg = props.article.images[0] ? props.article.images[0].news_photo_large : false
    return (
      <>
        <Link href={`/news/${encodeURIComponent(props.article.slug)}`}>
          <a>
            <article>
              <div className="image-col">
                <h2 className="top-story">Top Story</h2>
                {
                  mainImg ?
                    <Image
                      src={mainImg[0]}
                      width={mainImg[1]}
                      height={mainImg[2]}
                      alt=""
                      layout="responsive"
                    /> :
                    ""
                }
              </div>
              <div className="text-col">
                <div className="date-headline">
                  <span className="date">{articleDate(props.article.date)}</span>
                  <span
                    className="category"
                    style={{
                      color: categoryColor[props.category] ? categoryColor[props.category] : "#3E3E3E"
                    }}
                  >
              {props.category === "Uncategorized" ? "News" : props.category}
            </span>
                </div>
                <h3 dangerouslySetInnerHTML={{__html: props.article.title.rendered}}/>
                <div className="content" dangerouslySetInnerHTML={{__html: props.article.excerpt.rendered}}/>
              </div>
            </article>
          </a>
        </Link>
        <style jsx>
          {`
            article {
              color: #3E3E3E;
              display: flex;
              flex-wrap: wrap;
              width: 100%;
              font-size: 1.2rem;
              align-items: flex-start;
            }

            a {
              text-decoration: none;
              flex-grow: 1;
              margin-bottom: 76px;
              width: 100%;
            }

            .top-story {
              color: #3B73B1;
              font-size: 2em;
              text-transform: none;
            }

            .image-col {
              width: 400px;
              max-width: 100%;
              margin-right: 14px;
              min-width: 39%;
            }

            .text-col {
              width: 600px;
              max-width: 100%;
              min-width: 59%;
            }

            h3 {
              color: #141414;
              font-size: 2em;
              line-height: 1.1;
            }

            .date {
              font-size: .9em;
              color: #676767;
            }

            .category {
              font-weight: bold;
              margin-left: 7px;
              text-transform: uppercase;
            }

            .date-headline {
              font-size: 1.3em;
            }
          `}
        </style>
      </>
    )
  }
  if (props.sideBar) {
    return (
      <>
        <Link href={`/news/${encodeURIComponent(props.article.slug)}`}>
          <a>
                  <span
                    className="category"
                    style={{
                      color: categoryColor[props.category] ? categoryColor[props.category] : "#3E3E3E"
                    }}
                  >
              {props.category === "Uncategorized" ? "News" : props.category}
            </span>
            <h3 dangerouslySetInnerHTML={{__html: props.article.title.rendered}}/>
          </a>
        </Link>
        <style jsx>
          {`
            a {
              color: #3E3E3E;
              display: block;
              width: 300px;
              text-decoration: none;
              font-size: 1.2em;
            }

            h3 {
              color: #141414;
              font-size: 1.1em;
              line-height: 1.1;
            }

            .category {
              font-weight: bold;
              text-transform: uppercase;

            }
          `}
        </style>
      </>
    )
  }
  if (props.summary) {
    const mainImg = props.article.images[0] ? props.article.images[0].news_photo_large : false
    return (
      <>
        <Link href={`/news/${encodeURIComponent(props.article.slug)}`}>
          <a>
            <article>
              {
                mainImg ?
                  <div className="image-col">
                    <Image
                      src={mainImg[0]}
                      width={mainImg[1]}
                      height={mainImg[2]}
                      alt=""
                    />
                    <div className="date-headline">
                      <span className="date">{articleDate(props.article.date)}</span>
                      <h3 dangerouslySetInnerHTML={{__html: props.article.title.rendered}}/>
                    </div>
                  </div>
                  : ''
              }

              <div className="text-col">
                <div className="content" dangerouslySetInnerHTML={{__html: props.article.excerpt.rendered}}/>
              </div>
            </article>
          </a>
        </Link>
        <style jsx>
          {`
            article {
              color: #3E3E3E;
              display: flex;
              flex-wrap: wrap;
              width: 100%;
              font-size: 1.1rem;
            }

            a {
              text-decoration: none;
              flex-grow: 1;
              margin-bottom: 76px;
              width: 100%;
            }

            .image-col {
              width: 100%;
              margin-right: 14px;
              display: flex;
              align-items: flex-start;
              flex-wrap: wrap;
            }
            
            .text-col {
              width: ${mainImg ? "600px" : "100%"};
              flex-grow: 1;
              max-width: 100%;
              min-width: 59%;
            }

            h3 {
              color: #141414;
              font-size: 1.1em;
              line-height: 1.1;
            }

            .date {
              font-size: .9em;
              color: #676767;
            }

            .category {
              font-weight: bold;
              margin-left: 7px;
              text-transform: uppercase;
            }

            .date-headline {
              font-size: 1.3em;
              margin-left: 0;
            }
            
            @media all and (min-width: 1000px) {
              .image-col {
                flex-wrap: nowrap;
                margin-bottom: 14px;
              }
              .date-headline {
                margin-left: 14px;
              }
            }
          `}
        </style>
      </>
    )
  }
  if (props.summaryWithImage) {
    const mainImg = props.article.images[0] ? props.article.images[0].news_photo_large : false
    return (
      <>
        <Link href={`/news/${encodeURIComponent(props.article.slug)}`}>
          <a>
            <article>
              {
                mainImg ?
                  <div className="image-col">
                    <Image
                      src={mainImg[0]}
                      width={mainImg[1]}
                      height={mainImg[2]}
                      alt=""
                    />
                  </div>
                  : ''
              }

              <div className="text-col">
                <div className="date-headline">
                  <span className="date">{articleDate(props.article.date)}</span>
                </div>
                <h3 dangerouslySetInnerHTML={{__html: props.article.title.rendered}}/>
                <div className="content" dangerouslySetInnerHTML={{__html: props.article.excerpt.rendered}}/>
              </div>
            </article>
          </a>
        </Link>
        <style jsx>
          {`
            article {
              color: #3E3E3E;
              display: flex;
              flex-wrap: wrap;
              width: 100%;
              font-size: 1.2rem;
            }

            a {
              text-decoration: none;
              flex-grow: 1;
              margin-bottom: 76px;
              width: 100%;
            }

            .top-story {
              color: #3B73B1;
              font-size: 2em;
              text-transform: none;
            }

            .image-col {
              width: 400px;
              max-width: 100%;
              margin-right: 14px;
              min-width: 39%;
            }

            .text-col {
              width: ${mainImg ? "600px" : "100%"};
              flex-grow: 1;
              max-width: 100%;
              min-width: 59%;
            }

            h3 {
              color: #141414;
              font-size: 2em;
              line-height: 1.1;
            }

            .date {
              font-size: .9em;
              color: #676767;
            }

            .category {
              font-weight: bold;
              margin-left: 7px;
              text-transform: uppercase;
            }

            .date-headline {
              font-size: 1.3em;
            }
          `}
        </style>
      </>
    )
  } else {//the default article
    const images = props.article.images ? props.article.images.map(image => {
      const fileInfo = image.news_photo_full

      if (image.photo_caption || image.photo_source) {
        return (
          <figure
            key={fileInfo[0]}
          >
            <Image

              src={fileInfo[0]}
              width={fileInfo[1]}
              height={fileInfo[2]}
              alt=""
            />
            <figcaption>
              {
                image.photo_source ? <span className="source">{image.photo_source}</span> : ""
              }
              {
                image.photo_caption ? <span className="caption">{image.photo_caption}</span> : ""
              }
            </figcaption>
            <style jsx>
              {`
                figure {
                  font-size: .8rem;
                  font-style: italic;
                  margin-bottom: 14px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  max-width: 100%;
                }

                figcaption {
                  margin-top: 7px;
                  width: 600px;
                  max-width: 100%;
                  text-align: center;
                }

                .source {
                  display: block;
                  text-align: center;
                  font-weight: bold;
                }

                .caption {
                  display: block;
                  text-align: center;
                }
              `
              }
            </style>
          </figure>
        )
      } else {
        return (
          <Image
            key={fileInfo[0]}
            src={fileInfo[0]}
            width={fileInfo[1]}
            height={fileInfo[2]}
            alt=""
            style={{marginBottom: "14px", maxWidth: "100%"}}
          />
        )
      }


    }) : ""
    return (
      <>
        <article>
          <div className="image-col">
            <h1 dangerouslySetInnerHTML={{__html: props.article.title.rendered}}/>
            <div className="date-headline">
              <span className="source">{props.article.meta_box.news_source}</span>
              <span className="date">{articleDate(props.article.date)}</span>
              <Link href={`/category/${props.category === "Uncategorized" ? "News" : props.category}`}>
                <a>
                  <span
                    className="category"
                    style={{
                      color: categoryColor[props.category] ? categoryColor[props.category] : "#3E3E3E"
                    }}>
                  {props.category === "Uncategorized" ? "News" : props.category}
                  </span>
                </a>
              </Link>
            </div>
            {images}
          </div>
          <div className="text-col">
            <div className="content" dangerouslySetInnerHTML={{__html: props.article.content.rendered}}/>
          </div>
        </article>
        <style jsx>
          {`
            article {
              color: #3E3E3E;
              display: flex;
              flex-wrap: wrap;
              width: 100%;
              font-size: 1.2rem;
            }

            a {
              text-decoration: none;
            }

            .image-col {
              width: 100%;
              max-width: 100%;
              margin-right: 14px;
              min-width: 39%;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }

            .text-col {
              width: 100%;
              max-width: 100%;
              min-width: 59%;
              margin-top: 28px;
            }

            h1 {
              color: #141414;
              font-size: 3rem;
              line-height: 1.1;
              width: 100%;
            }

            .source {
              font-size: 1.1rem;
              color: #676767;
              display: block;
            }

            .date {
              font-size: 1.1rem;
              color: #676767;
            }

            .category {
              font-weight: bold;
              margin-left: 7px;
              text-transform: uppercase;
            }

            .date-headline {
              margin-bottom: 28px;
              width: 100%;
            }
          `}
        </style>
      </>
    )
  }
}

export default NewsArticle
