import React from 'react'
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import { siteTitle} from "../../site-settings"
import Weather from "../../components/Weather"

const  WeatherPage = () => {

  return (
    <MainLayout noWeather>
      <Head>
        <title>{siteTitle} - Weather</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <Weather/>
    </MainLayout>
  )
}

export default WeatherPage
