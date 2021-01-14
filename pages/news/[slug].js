import React from 'react'
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import {baseUrl, siteTitle} from "../../site-settings"
import {fetcher, useArticles} from "../../utils/cachedData"
import NewsArticle from "../../components/NewsArticle"
import {useRouter} from "next/router"

const NewsPage = props => {
  const router = useRouter()


  if (!props.articles) {
    return (
      <h2>Loading...</h2>
    )
  }
  const {articles, isLoading, isError} = useArticles({url: `${baseUrl}/wp-json/wp/v2/posts?slug=${router.query.slug}`,initialData: props.articles})

  if (isLoading){
    return (
      <h2>Loading...</h2>
    )
  }

  const storyCat = props.categories.filter(category => {
    return category.id === articles[0].categories[0]
  })
  return (
    <MainLayout>
      <Head>
        <title>{siteTitle} - {articles[0].title.rendered}</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta property="og:url"
              content={`https://www.kbhbradio.com${router.asPath}`} />
        <meta property="og:type" content="article"/>
        <meta property="og:title" content={articles[0].title.rendered}/>
        {
          articles[0].images[0] ?
            <>
            <meta property="og:image"
                  content={articles[0].images[0].news_photo_full[0]}/>
            <meta property="og:width" content={articles[0].images[0].news_photo_full[1]}/>
          <meta property="og:height" content={articles[0].images[0].news_photo_full[2]}/>
          </>
          :
          ""
        }

      </Head>
      <NewsArticle
        article={articles[0]}
        category={storyCat[0].name}
      />
    </MainLayout>
  )
}

export async function getStaticPaths() {

  /*const paths = data.map(page => ({
    params: {slug: '*'}
  }))*/
  const posts = await fetcher(`${baseUrl}/wp-json/wp/v2/posts?per_page=100`)

  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params, preview = false, previewData}) {
  try {
    const [categories, articles] = await Promise.all([
      fetcher(`${baseUrl}/wp-json/wp/v2/categories`),
      fetcher(`${baseUrl}/wp-json/wp/v2/posts?slug=${params.slug}`)
    ])

    return {
      props: {
        articles: articles,
        categories: categories
      },
      revalidate: 5
    }
  } catch (e) {
    console.log(e)
    return {props: {}}
  }
}

export default NewsPage
