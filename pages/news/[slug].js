import React from 'react'
import fetch from "isomorphic-unfetch"
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import DynamicContent from "../../components/DynamicContent"
import {baseUrl, siteTitle} from "../../site-settings"
import {fetcher} from "../../utils/cachedData"
import {activeItemsOnly} from "../../utils/eventHelpers"
import NewsArticle from "../../components/NewsArticle"
import {useRouter} from "next/router"

const NewsPage = props => {
  const router = useRouter()

  if (!props.article) {
    return (
      <h2>Loading...</h2>
    )
  }

  const storyCat = props.categories.filter(category => {
    return category.id === props.article.categories[0]
  })
  return (
    <MainLayout>
      <Head>
        <title>{siteTitle} - {props.article.title.rendered}</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta property="og:url"
              content={`https://www.kbhbradio.com${router.asPath}`} />
        <meta property="og:type" content="article"/>
        <meta property="og:title" content={props.article.title.rendered}/>
        <meta property="og:image"
              content={props.article.images[0].news_photo_full[0]}/>
      </Head>
      <NewsArticle
        article={props.article}
        category={storyCat[0].name}
      />
    </MainLayout>
  )
}

export async function getStaticPaths() {

  /*const paths = data.map(page => ({
    params: {slug: '*'}
  }))*/

  return {
    paths: [
      {params: {slug: '*'}}
    ]
    ,
    fallback: true
  }
}

export async function getStaticProps({params, preview = false, previewData}) {
  console.log(params)
  try {
    const [categories, articles] = await Promise.all([
      fetcher(`${baseUrl}/wp-json/wp/v2/categories`),
      fetcher(`${baseUrl}/wp-json/wp/v2/posts?slug=${params.slug}`)
    ])

    return {
      props: {
        article: articles[0],
        categories: categories
      }
    }
  } catch (e) {
    console.log(e)
    return {props: {}}
  }
}

export default NewsPage
