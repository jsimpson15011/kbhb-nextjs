import React from 'react'
import MainLayout from "../../components/MainLayout"
import Head from "next/head"
import DynamicContent from "../../components/DynamicContent"
import {siteTitle} from "../../site-settings"
import {fetcher} from "../../utils/cachedData"

const Announcement = props => {
  if (!props.announcement){
    return (
      <></>
    )
  }
  return (
    <MainLayout>
      <Head>
        <title>{siteTitle} - {props.announcement.title.rendered}</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <DynamicContent content={props.announcement}/>
    </MainLayout>
  )
}

export async function getStaticPaths() {

  /*const paths = data.map(page => ({
    params: {slug: '*'}
  }))*/
  const posts = await fetcher(`https://psa.homesliceweb.com/wp-json/wp/v2/psas`)

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
    const [announcment] = await Promise.all([
      fetcher(`https://psa.homesliceweb.com/wp-json/wp/v2/psas?slug=${params.slug}`)
    ])

    return {
      props: {
        announcement: announcment[0],
      }
    }
  } catch (e) {
    console.log(e)
    return {props: {}}
  }
}

export default Announcement
