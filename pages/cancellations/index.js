import React from 'react'
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import DynamicContent from "../../components/DynamicContent"
import {siteTitle} from "../../site-settings"
import {useSelector} from "react-redux"

const Closures = () => {
  const closure = useSelector(state => state.announcements.announcementItems.closures)[0]
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