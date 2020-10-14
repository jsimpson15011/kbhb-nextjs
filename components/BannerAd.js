import React from 'react'
import {useBannerAds} from "../utils/cachedData"

const BannerAd = ({position, page}) => {
  const {data, isLoading, isError} = useBannerAds()

  if (isLoading && !isError) {
    return(
      <div style={{height: "85px"}}/>
    )
  }

  let filteredAds =  data.filter(bannerAd =>  {
    return bannerAd.meta_box.banner_location.indexOf(position) !== -1
  })

  if (typeof page !== 'undefined' && position !== "header"){
    filteredAds = filteredAds.filter(bannerAd => {
      /*TODO add page filter for banner ads*/
    })
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
  }

  const randomInt = getRandomInt(0, (filteredAds.length))

  const currentBanner = filteredAds[randomInt]

  console.log(currentBanner.meta_box.banner_banner_image[0].width)

  return (
    <div className="banner-container">
      <a href={currentBanner.meta_box.banner_external_link}>
        <img src={currentBanner.meta_box.banner_banner_image[0].full_url} alt={currentBanner.title.rendered}/>
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
