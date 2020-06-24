import React from 'react'

const BannerAd = (bannerAds) => {
  if (bannerAds.bannerAds.bannerAds === null || bannerAds.bannerAds.bannerAds.length === 0) {
    return null
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
  }

  const randomInt = getRandomInt(0, (bannerAds.bannerAds.bannerAds.length))

  const currentBanner = bannerAds.bannerAds.bannerAds[randomInt]

  return (
    <div className="banner-container">
      <a href={currentBanner.meta_box.banner_external_link}>
        <img src={currentBanner.meta_box.banner_banner_image[0].full_url} alt={currentBanner.title.rendered}/>
      </a>
      <style jsx>
        {`
        .banner-container{
          width: 100%;
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
