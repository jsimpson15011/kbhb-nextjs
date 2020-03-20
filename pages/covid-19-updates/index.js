import React from 'react'
import Head from "next/head"
import MainLayout from "../../components/MainLayout"
import {metaDescription, siteTitle} from "../../site-settings"
import AudioPlayer from "../../components/AudioPlayer"
import {useSelector} from "react-redux"


const AudioPage = () => {
  const covidItems = useSelector(state => state.covidItems.covidItems)
  const audioArray = covidItems.covidItems.map(covidItem => {
    return({
      title: covidItem.title.rendered,
      url: covidItem.meta_box.covid_audio_file[0].url
    })
  })

  if (covidItems === null) {
    return (
      <></>
    )
  }

  return (
    <div>
      <Head>
        <title>{siteTitle} - Whiskey at Work</title>
        <link rel='icon' href='/favicon.ico'/>
        <meta name="description"
              content={`${metaDescription}`}/>
      </Head>
      <MainLayout>
        <h2 style={{width:"100%"}}>Covid-19 Updates</h2>
        <AudioPlayer audio={audioArray}/>
      </MainLayout>
    </div>
  )
}

export default AudioPage