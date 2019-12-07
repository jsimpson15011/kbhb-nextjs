import React from 'react'
import mainTheme from "../styles/katTheme"

const NewsFeed = props => {
  if (props.items === null){
    return (
      <h2>Loading</h2>
    )
  }
  return(
    <section className='news-feed'>
      <h2>Local News</h2>
      <hr className='thin-hr'/>
      {props.items.map(article => {
        let newsArticle =
          <article key={ article.title } className='article'>
            <img src={ article.image.url } alt=''/>
            <div className='article-content'>
              <a href={ article.link }>
                <h3>{ article.title }</h3>
                <p>{ article.content }</p>
                <p className='pub-date'>{ article.pubDate }</p>
              </a>
            </div>
            <hr className='thin-hr'/>
          </article>
        return (
          newsArticle
        )
      })}
      <style jsx>{`
      .news-feed h2{
        font-size: 2em;
        margin-bottom: .5em;
        text-transform: uppercase;
      }
      .article{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
      }
      .article img{
        width: 120px;
      }
      .article .pub-date{
        font-style: italic;
        margin: .5em 0;
      }
      .article-content{
        min-width: 75%;
        width: 400px;
        max-width: 100%;
      }
      .article hr{
        width: 100%;
      }
      .article a{
        color: white;
        text-decoration: none;
      }
      .article h3{
        color: ${ mainTheme.brand };
        font-size: 1.25em;
        margin-bottom: .5em;
        text-transform: uppercase;
      }
`}
      </style>
    </section>
  )
}

export default NewsFeed