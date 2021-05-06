import React from 'react'
import {useRouter} from "next/router"
import {useBannerAds} from "../utils/cachedData"
import Image from "next/image"
import Ad from "./Ad"

const BannerAd = ({position, googleFallback}) => {
  const router = useRouter()
  const currentSlug = router.query.slug || router.route.replace('/','')
  const {data, isLoading, isError} = useBannerAds()

  if (isLoading && !isError) {
    return(
      <></>
    )
  }

  let filteredAds =  data.filter(bannerAd =>  {
    return bannerAd.meta_box.banner_location.indexOf(position) !== -1
  })

  if (position !== "header"){
    filteredAds = filteredAds.filter(bannerAd => {
      if (!currentSlug){
        return bannerAd['page-slugs'].indexOf("home") !== -1
      }
      return bannerAd['page-slugs'].indexOf(currentSlug) !== -1
    })
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
  }

  const randomInt = getRandomInt(0, (filteredAds.length))

  const currentBanner = filteredAds[randomInt]

  if (!currentBanner && googleFallback){
    return <div className="ad-wrapper">
     <Ad
        class="adsbygoogle"
        style={{display: "block", minHeight: "280px", width: "100%"}}
        slot="7834969863"
        format="auto"
        responsive="true"
      />
    </div>
  }
  if (!currentBanner){
    return <></>
  }
  return (
    <div className="banner-container">
      <a href={currentBanner.meta_box.banner_external_link}>
        <Image width={currentBanner.images[0].photo_full[1]} height={currentBanner.images[0].photo_full[2]} src={currentBanner.images[0].photo_full[0]} alt={currentBanner.title.rendered}/>
      </a>
      <style jsx>
        {`
        .banner-container{
          display: flex;
        }
        img{
          display: block;
        }
`}
      </style>
    </div>
  )
}

export default BannerAd
