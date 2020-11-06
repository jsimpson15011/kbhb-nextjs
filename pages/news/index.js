import React from 'react'
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import {baseUrl, siteTitle} from "../../site-settings"
import {fetcher} from "../../utils/cachedData"
import NewsArticle from "../../components/NewsArticle"

const Category = props => {
  if (!props.articles) {
    return (
      <h2>Loading...</h2>
    )
  }
  const newsArticles = props.articles.filter(article => {
    return (
      (
        article.categories.indexOf(props.category.id) !== -1
      )
    )
  }).map(article => {
    return (
      <React.Fragment key={article.id}>
        <NewsArticle
          summaryWithImage
          article={article}
        />
        <div/>
        <style jsx>
          {
            `
            div{
              width: 100%;
              height: 2px;
              background: #edf0f1;
              margin-bottom: 14px;
            }
`
          }
        </style>
      </React.Fragment>
    )
  })

  return (
    <MainLayout>
      <Head>
        <title>{siteTitle} - {props.title}</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <div className="news-section">
        <h2>news</h2>
        {newsArticles}
      </div>
    </MainLayout>
  )
}

export async function getStaticPaths() {

  /*const paths = data.map(page => ({
    params: {slug: '*'}
  }))*/
  const posts = await fetcher(`${baseUrl}/wp-json/wp/v2/posts?per_page=20`)

  const paths = posts.map(post => ({
    params: {slug: post.slug}
  }))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params, preview = false, previewData}) {
  try {
    const [categories, articles] = await Promise.all([
      fetcher(`${baseUrl}/wp-json/wp/v2/categories?slug=news`),
      fetcher(`${baseUrl}/wp-json/wp/v2/posts?per_page=100`)
    ])

    return {
      props: {
        articles: articles,
        category: categories[0]
      }
    }
  } catch (e) {
    console.log(e)
    return {props: {}}
  }
}

export default Category
