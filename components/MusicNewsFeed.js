import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import dynamic from "next/dynamic"
import {newsTitle} from "../site-settings"

const LazyLoad = dynamic(() => import('react-lazyload'))

const MusicNewsFeed = props => {
  if (props.items === null) {
    return (
      <h2>Loading</h2>
    )
  }
  return (
    <section className='news-feed'>
      <h2>{newsTitle}</h2>
      <hr className='thin-hr'/>
      {props.items.map(article => {
        const image = article["media:group"] ? article["media:group"].filter(media => {
          return media["media:content"][0]["$"].type.includes('image')
        })[0] : []

        const mp3 = article["media:group"] ? article["media:group"].filter(media => {
          return media["media:content"][0]["$"].type.includes('audio')
        }) : []

        const imgSrc = image["media:content"]? image["media:content"][0]["$"].url : false
        const imgCredit = image["media:credit"]? image["media:credit"][0]["_"] : ""
        const newsArticle =
          <article key={article.title} className='article'>
            <div className='article-content'>
               {imgSrc ? <LazyLoad>
                <aside className="img-container">
                  <img src={imgSrc} alt=''/>
                  <p>{imgCredit}</p>
                </aside>
              </LazyLoad>
                 : ""
               }
              <div>
                <h3>{ReactHtmlParser(article.title)}</h3>
                {ReactHtmlParser(article.content)}
                {mp3 ? mp3.map(mp3 => {
                  const source = mp3["media:content"][0]["$"].url
                  return ReactHtmlParser(`<audio controls>
                        <source src="${source}"/>
                    </audio>`)
                }) : ''}
              </div>
            </div>
            <hr className='thin-hr'/>
          </article>
        return (
          newsArticle
        )
      })}
      <style jsx>{`
      .news-feed{
        margin-bottom: 84px; 
      }
      .article{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
      }
      .article img{
        width: 100%;
      }
      .article .img-container{
        font-style: italic;
        float: left;
        font-size: .9em;
        text-align: center;
        width: 150px;
        margin-right: 14px;
      }
      .article .pub-date{
        font-style: italic;
        margin: .5em 0;
      }
      .article-content{
        width: 100%;
      }
      .article hr{
        width: 100%;
      }
      .article a{
        color: white;
        text-decoration: none;
      }
      .article h3{
        color: #ff1616;
        font-size: 1em;
        margin-bottom: .5em;
        text-transform: uppercase;
      }
`}
      </style>
    </section>
  )
}

export default MusicNewsFeed
