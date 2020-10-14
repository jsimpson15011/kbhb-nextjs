import React from 'react'
import {useSelector} from "react-redux"

const BannerAd = ({position, page}) => {
  const bannerAds = null //todo finish banner ads

  if (bannerAds === null || bannerAds.length === 0) {
    return null
  }

  let filteredAds =  bannerAds.filter(bannerAd =>  {
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
