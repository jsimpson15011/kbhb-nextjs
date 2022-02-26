import React from 'react'
import Head from 'next/head'
import {baseUrl, siteTitle} from "../../site-settings"
import {fetcher} from "../../utils/cachedData"
import MainLayout from "../../components/MainLayout"
import AudioPlayer from "../../components/AudioPlayer"


const OnDemandPage = props => {
  const titleAndUrl = props.articles.map(article => {
    return {
      title: article.title.rendered,
      url: article.meta_box.audio_file[0].url,
      onDemandCategory: article['on-demand-category'],
      thumbnail: article.images
    }
  })

  const articlesByCategory = props.categories.map(category => {
    return {
      title: category.name,
      audio: titleAndUrl.filter(article => {
        return article.onDemandCategory.indexOf(category.id) !== -1
      })
    }
  })

  const players = articlesByCategory.map(audioFiles => {
    return <div key={audioFiles.title}>
        <h2>{audioFiles.title}</h2>
        <AudioPlayer id={audioFiles.title} audio={audioFiles.audio}/>
        <style jsx>
          {`
            h2{
              text-align: center;
              color: white;
              width: 100%;
              background: #3B73B1;
            }
            div{
              margin-bottom: 21px;
              background: #fafafa;
              padding-bottom: 14px;
              width: 500px;
              max-width: 100%;
            }
`}
        </style>
      </div>
    }
  )

  return (
    <MainLayout menuItems={props.menuItems}>
      <Head>
        <title>{siteTitle} - On Demand</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <div className="on-demand-flex">
        {players}
      </div>
      <style jsx>
        {`
          .on-demand-flex{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }        
`}
      </style>
    </MainLayout>
  )
}

export async function getStaticProps() {
  try {
    const [categories, articles] = await Promise.all([
      fetcher(`${baseUrl}/wp-json/wp/v2/on-demand-category`),
      fetcher(`${baseUrl}/wp-json/wp/v2/on-demand?per_page=100`)
    ])

    return {
      props: {
        articles: articles,
        categories: categories.filter(category => {return category.slug === 'rodeo-rapid-city' || category.slug === 'black-hills-stock-show'})
      },
      revalidate: 1
    }
  } catch (e) {
    console.log(e)
    
  }
}


export default OnDemandPage
