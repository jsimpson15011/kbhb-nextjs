import React from 'react'
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import DynamicContent from "../../components/DynamicContent"
import {siteTitle} from "../../site-settings"
import {fetcher} from "../../utils/cachedData"

const Closures = (props) => {
/*  const {closureItems, isLoading, isError} = useClosures({
    url: "https://psa.homesliceweb.com/wp-json/wp/v2/closures", initialData: props.closures})
  if (isLoading){
    return <></>
  }*/
  //const closure = closureItems[0]
  const closure = props.closures[0]

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
export async function getStaticProps() {
  const closure = await fetcher("https://psa.homesliceweb.com/wp-json/wp/v2/closures")
  return {
    props: {
      closures: closure
    },
    revalidate: 5
  }
}
export default Closures