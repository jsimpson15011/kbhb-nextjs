import React from 'react'
import fetch from "isomorphic-unfetch"
import MainLayout from "../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import DynamicContent from "../components/DynamicContent"
import {baseUrl, siteTitle} from "../site-settings"
import {fetcher} from "../utils/cachedData"
import {useRouter} from "next/router"

const Page = props => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div>
        LOADING...
      </div>
    )
  }

  return (
    <MainLayout menuItems={props.menuItems}>
      <Head>
        <title>{siteTitle} - {props.content.title.rendered}</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <DynamicContent content={props.content}/>
    </MainLayout>
  )
}

export async function getStaticProps(context) {
  const slug = context.params.slug
  const [res, menuItems] = await Promise.all([
    await fetch(`${baseUrl}/wp-json/wp/v2/pages?slug=${slug}&_embed`),
    fetcher(`${baseUrl}/wp-json/menus/v1/menus/main-navigation`)
  ])

  const data = await res.json()

  if(!data[0]){
    return {
      notFound: true
    }
  }

  return {
    props: {
      content: data[0],
      menuItems: menuItems,
      key: data[0].id
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/pages?_embed&per_page=100&exclude=570,518,517,583,476,1070, 473, 116467`)
  const data = await res.json()

  const paths = data.map(page => ({
    params: {slug: page.slug}
  }))

  return {
    paths,
    fallback: true
  }
}

export default Page
