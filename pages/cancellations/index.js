import React from 'react'
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import DynamicContent from "../../components/DynamicContent"
import {siteTitle} from "../../site-settings"
import {useClosures} from "../../utils/cachedData"

const Closures = () => {
  const {closureItems, isLoading, isError} = useClosures()
  if (isLoading){
    return <></>
  }
  const closure = closureItems[0]

  return (
    <MainLayout>
      <Head>
        <title>{siteTitle} - {closure.title.rendered}</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <DynamicContent content={closure}/>
    </MainLayout>
  )
}

export default Closures