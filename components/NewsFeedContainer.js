import React from 'react'
import mainTheme from "../styles/katTheme"
import NewsArticle from "./NewsArticle"

const NewsFeedContainer = props => {

  const topStoryCat = props.categories.filter(category => {
    return category.id === props.topStory.categories[0]
  })

  return (
    <>
      <NewsArticle
        topStory
        article = {props.topStory}
        category = {topStoryCat[0].name}
      />
      <style global jsx>
        {`
a > span{
  color: white;
}
      .read-more-news{
        background: #f3f3f3;
        border: ${mainTheme.brand} solid 4px;
        padding: 7px;
        box-sizing: border-box;
        font-weight: bold;
        text-decoration: none;
        color: #100f0f;
        display: block;
        text-align: center;
        margin-bottom: 21px;
      }
`}
      </style>
    </>
  )
}

export default NewsFeedContainer
