import React, {useState} from 'react'
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import {baseUrl, siteTitle} from "../../site-settings"
import {fetcher, useArticles} from "../../utils/cachedData"
import NewsArticle from "../../components/NewsArticle"
import {categoryColor} from "../../utils/articleFunctions"
import {useRouter} from "next/router"


const Category = props => {

  if (!props.articles || !props.category) {
    return (
      <h2>Loading...</h2>
    )
  }

  const {articles, isLoading, isError} = useArticles({url: `${baseUrl}/wp-json/wp/v2/posts?per_page=10&categories=${props.category.id}`,initialData: props.articles})

  if (isLoading){
    return (
      <h2>Loading...</h2>
    )
  }

  //const articles = props.articles

  const perPage = 10
  const [newsArticles, setNewsArticles] = useState(articles)
  const [offset, setOffset] = useState(perPage)
  const [loadButtonState, setLoadButtonState] = useState('block')

/*  useEffect(() => {
    const articles = fetcher(`${baseUrl}/wp-json/wp/v2/posts?per_page=${perPage}&categories=${props.category.id}`)
    articles.then(articles => {
      setNewsArticles(articles)
      setLoadButtonState('block')
      setOffset(perPage)
      }
    )
  }, [router.asPath])*/

  const articleJSX = newsArticles.map(article => {
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

  const handleClick = async () => {
    const articles = await fetcher(`${baseUrl}/wp-json/wp/v2/posts?per_page=${perPage}&categories=${props.category.id}&offset=${offset}`)
    if (articles.length === 0) {
      setLoadButtonState('none')
    } else {
      setNewsArticles(newsArticles.concat(articles))
      setOffset(offset + perPage)
    }
  }

  return (
    <MainLayout>
      <Head>
        <title>{siteTitle} - {props.category.name}</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <div className="news-section">
        <h2 style={{color: categoryColor[props.category.name]}}>{props.category.name}</h2>
        {articleJSX}
        <button style={{display: loadButtonState}} onClick={handleClick}>
          Load More
        </button>
      </div>
      <style jsx>
        {
          `
            button{
              background: #3B73B1;
              color: white;
              font-size: 1.5rem;
              display: block;
              margin-left: auto;
              margin-right: auto;
              padding: 7px 48px;
              border: none;
              box-shadow: gray 2px 2px 2px;
            }
`
        }
      </style>
    </MainLayout>
  )
}

export async function getStaticPaths() {

  /*const paths = data.map(page => ({
    params: {slug: '*'}
  }))*/
  const categories = await fetcher(`${baseUrl}/wp-json/wp/v2/categories?per_page=100`)

  const paths = categories.map(category => ({
    params: {slug: category.slug}
  }))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params, preview = false, previewData}) {
  try {
    const categories = await fetcher(`${baseUrl}/wp-json/wp/v2/categories?slug=${params.slug}`)
    const articles = await fetcher(`${baseUrl}/wp-json/wp/v2/posts?per_page=10&categories=${categories[0].id}`)


    return {
      props: {
        articles: articles,
        category: categories[0],
        key: categories[0].id
      },
      revalidate: 5
    }
  } catch (e) {
    console.log(e)
    return {props: {}}
  }
}

export default Category
