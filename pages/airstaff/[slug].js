import React from 'react'
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import {baseUrl, siteTitle} from "../../site-settings"
import {fetcher} from "../../utils/cachedData"
import Image from "next/image"
import Link from "next/link"
import ReactHtmlParser from "react-html-parser"

const AirStaff = props => {
  if (!props.airStaff || !props.newsStories) {
    return (<></>)
  }

  const stories = props.newsStories.length ? props.newsStories.map(story => {
      return <h4 key={story.slug}>
        <Link href={'/news/'+story.slug}>
          <a dangerouslySetInnerHTML={{__html: story.title.rendered}}>
          </a>
        </Link>
        <style jsx>{`
          a{
            color: #2F629B;
          }
          h4{
            margin-bottom: .5rem;
          }
`}</style>
      </h4>
    }
  ) : ""

  const mainImg = props.airStaff.images
  const airStaff =
    <div className="air-staff">
      {
        mainImg ?
          <Image
            className="air-staff__img"
            src={mainImg[0]}
            width={mainImg[1]}
            height={mainImg[2]}
            alt=""
          /> :
          ""
      }
      <div className="air-staff__text">
        <h2>
          {ReactHtmlParser(props.airStaff.title.rendered)}
        </h2>
        {ReactHtmlParser(props.airStaff.content.rendered)}
        {stories.length > 0 ? <h3>Stories</h3> : ""}
        {stories}
      </div>
      <style jsx>
        {`
          .air-staff {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            background: #e4eaf5;
            padding: 14px;
            box-sizing: border-box;
            width: 100%;
            margin-bottom: 14px;
            margin-top: 14px;
            justify-content: space-around;
          }

          .air-staff__text {
            width: 850px;
            max-width: 100%;
          }

          .air-staff__img {
            align-self: flex-start;
          }

        `}
      </style>
    </div>

  return (
    <MainLayout>
      <Head>
        <title>{siteTitle} - {props.airStaff.title.rendered}</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      {airStaff}
    </MainLayout>
  )
}

export async function getStaticPaths() {

  /*const paths = data.map(page => ({
    params: {slug: '*'}
  }))*/
  const posts = await fetcher(`${baseUrl}/wp-json/wp/v2/personality`)

  const paths = posts.map(post => ({params: {slug: post.slug}}))

  return {
    paths,
    fallback: true
  }
}

export async function
getStaticProps({params, preview = false, previewData}) {
  try {
    const [airStaff] = await Promise.all([
      fetcher(`${baseUrl}/wp-json/wp/v2/personality?slug=${params.slug}`),
    ])
    let userId = 0
    if (airStaff[0].slug === 'francie-ganje') {
      userId = 6
    }
    if (airStaff[0].slug === 'gary-matthews') {
      userId = 4
    }

    const newsStories = await fetcher(`${baseUrl}/wp-json/wp/v2/posts?author=${userId}&per_page=100`)

    const filteredStories = newsStories.filter(story => {
      if (userId === 6) {
        return story['meta_box']['news_source'] === 'F.Ganje'
      }
      if (userId === 4) {
        return story['meta_box']['news_source'] === 'Gary Matthews'
      }
      return false
    })

    filteredStories.length = filteredStories.length > 10 ? 10 : filteredStories.length

    return {
      props: {
        airStaff: airStaff[0],
        newsStories: filteredStories
      }
    }
  } catch (e) {
    console.log(e)
    
  }
}

export default AirStaff
