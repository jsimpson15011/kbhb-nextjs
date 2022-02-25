import React from 'react'
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import {baseUrl, siteTitle} from "../../site-settings"
import {fetcher} from "../../utils/cachedData"
import NewsArticle from "../../components/NewsArticle"
import {useRouter} from "next/router"
import sanitizeHtml from 'sanitize-html'

const NewsPage = props => {
  const router = useRouter()


  if (!props.articles) {
    console.log(props)
    return (
      <h2>Loading...</h2>
    )
  }
  const articles = props.articles
/*  const {articles, isLoading, isError} = useArticles({
    url: `${baseUrl}/wp-json/wp/v2/posts?slug=${router.query.slug}`,
    initialData: props.articles
  })

  if (isLoading) {
    return (
      <h2>Loading...</h2>
    )
  }*/

  const storyCat = props.categories.filter(category => {
    return category.id === articles[0].categories[0]
  })

  const metaDescription = sanitizeHtml(articles[0].excerpt.rendered, {allowedTags: [], allowedAttributes: []})

/*  const tagNames = props.tags.map(tag => {
    return tag.name
  })*/

  const sourceHasUrl = articles[0].meta_box.news_source === 'Gary Matthews' || articles[0].meta_box.news_source === 'F.Ganje'
  const isGary = articles[0].meta_box.news_source === 'Gary Matthews'
  //const isFrancie = articles[0].meta_box.news_source === 'F.Ganje'

  return (
    <MainLayout menuItems={props.menuItems} width={"850px"}>
      <Head>
        <title>{siteTitle} - {articles[0].title.rendered}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Article",
              "datePublished": articles[0]["date_gmt"],
              "headline": articles[0].title.rendered,
              "image": articles[0].images[0] ? articles[0].images[0].news_photo_full[0] : "/img/logo.png",
              "isAccessibleForFree": true,
              "author": {
                "name": articles[0].meta_box.news_source,
                "type": sourceHasUrl ? "person" : "thing",
                "url": sourceHasUrl ? isGary ? 'https://kbhbradio.com/airstaff/gary-matthews' : 'https://kbhbradio.com/airstaff/francie-ganje' : ''
              },
              "publisher": {
                "@type": "Organization",
                "name": "KBHB Ranch Radio"
              }
            })
          }}
        />


        <link rel="icon" href="/favicon.ico"/>

        <meta property="og:url"
              content={`https://www.kbhbradio.com${router.asPath}`}/>
        <meta content={articles[0].meta_box.news_source} name="author"/>
        <meta property="og:title" content={articles[0].title.rendered}/>
        <meta property="twitter:title" content={articles[0].title.rendered}/>
        <meta content={metaDescription} property="og:description"/>
        <meta content={metaDescription} name="description"/>
        <meta content={metaDescription} name="twitter:description"/>
        <meta content="KBHB Ranch Radio" property="og:site_name"/>

        {
          false ?
            <meta content={tagNames} name="keywords"/> :
            ""
            }


        <meta content="summary_large_image" name="twitter:card"/>
        <meta property="og:type" content="article"/>
        <meta property="article:content-tier" content="free"/>

        {
          articles[0].images[0] ?
            <>
              <meta property="og:image"
                    content={articles[0].images[0].news_photo_full[0]}/>
              <meta property="og:width" content={articles[0].images[0].news_photo_full[1]}/>
              <meta property="og:height" content={articles[0].images[0].news_photo_full[2]}/>
              <meta name="thumbnail"
                    content={articles[0].images[0].news_photo_full[0]}/>
              <meta name="twitter:image"
                    content={articles[0].images[0].news_photo_full[0]}/>
              <link rel="image_src" href={articles[0].images[0].news_photo_full[0]}/>
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
    params: {slug: post.slug}
  }))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params}) {
  try {
    const [categories, articles, menuItems] = await Promise.all([
      fetcher(`${baseUrl}/wp-json/wp/v2/categories`),
      fetcher(`${baseUrl}/wp-json/wp/v2/posts?slug=${params.slug}`),
      fetcher(`${baseUrl}/wp-json/menus/v1/menus/main-navigation`),
    ])

  /*  const tagPromises = articles[0].tags.map(tag => {
      return fetcher(`${baseUrl}/wp-json/wp/v2/tags/${tag}`)
    })*/

    //const resolvedTags = await Promise.all(tagPromises)

    return {
      props: {
        articles: articles,
        categories: categories,
        menuItems: menuItems,
        //tags: resolvedTags
      },
      revalidate: 5
    }
  } catch (e) {
    console.log(e)
    return {props: {}}
  }
}

export default NewsPage
