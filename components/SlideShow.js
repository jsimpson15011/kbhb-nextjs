import React from 'react'
import mainTheme from "../styles/katTheme"
import dynamic from "next/dynamic"

const LazyLoad = dynamic(() => import('react-lazyload'))
const Slider = dynamic(() => import('react-slick'))
import "slick-carousel/slick/slick.css"
import '../styles/slick-theme.css'
import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"

const BelowSlideShow = () => {
  return (
    <div>
      <h2>The Black Hills' Favorite Country Station</h2>
      <a href="http://kout.tunegenie.com/#listenlive" className='listen-online'>Listen Online Now</a>
      <a href="https://thehomeslicegroup.com/" className='homeslice-media'>Homeslice Media Group</a>
      <style jsx>{`
        div{
          background: ${mainTheme.accent};
          color: white;
          display: flex;
          flex-wrap: wrap;
          text-transform: uppercase;
          align-items: center;
          font-weight: bold;
          letter-spacing: 2px;
          margin-bottom: 14px;
        }
        a:hover, a:focus{
          background: ${mainTheme.accent};
          border: 1px solid
        }
        h2{
          margin-left: auto;
          margin-right: 3em;
          margin-bottom: 0;
          font-size: 1em;
        }
        .listen-online{
          background: black;
          border: 1px solid black;
        }
        .homeslice-media{
          background: #104b7d;
          border: 1px solid #104b7d;
          margin-right: 2em;
        }
        .listen-online, .homeslice-media{
          color: white;
          text-decoration: none;
          padding: .3em .8em;
        }
    `}</style>
    </div>
  )
}

const SmallImages = ({slides}) => {
  const images = slides.map(slide => {
    if (slide.externalLink && slide.smallImage) {
      return (
        <div className='slide-container' key={slide.smallImage}>
          <a href={slide.externalLink}>
            <img alt={slide.alt} src={slide.smallImage}/>
          </a>
          <style jsx>
            {`
              .slide-container{
                width: 235px;
              }
            `}
          </style>
        </div>
      )
    } else if (slide.smallImage) {
      return (
        <div className='slide-container' key={slide.smallImage}>
          <Link href={slide.slug}>
            <a>
              <img alt={slide.alt} src={slide.smallImage}/>
            </a>
          </Link>
          <style jsx>
            {`
              .slide-container{
                width: 235px;
              }
            `}
          </style>
        </div>
      )
    }
  })

  return (
    <MaxWidthWrapper>
      <div className="image-container">
        {images}
      </div>
      <style jsx>
        {`
            .image-container{
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
            }
          `}
      </style>
    </MaxWidthWrapper>
  )
}

const SlideShow = ({slides}) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000
  }

  if (!slides) {
    return (
      <div>
        Loading
      </div>
    )
  }

  return (
    <div className='slide-show'>
      <LazyLoad>
        <Slider {...settings}>
          {slides.map(slide => {
            if (slide.externalLink && slide.image) {
              return (
                <div className='slide-container' key={slide.image}>
                  <a href={slide.externalLink}>
                    <img alt={slide.alt} src={slide.image}/>
                  </a>
                </div>
              )
            } else if (slide.image) {
              return (
                <div className='slide-container' key={slide.image}>
                  <Link href={slide.slug}>
                    <a>
                      <img alt={slide.alt} src={slide.image}/>
                    </a>
                  </Link>
                </div>
              )
            }
          })}
        </Slider>
      </LazyLoad>
      <BelowSlideShow/>
      <LazyLoad>
        <SmallImages slides={slides}/>
      </LazyLoad>
      <style jsx>{`
        .slide-show img{
          display: block;
          width: 100%;
          height: auto;
        }
        .slide-show{
          opacity: 0;
          transform: translateY(-50%);
          max-width: 2000px;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 14px;
        }
        .slide-container{
          display: block;
        }
      `}</style>
    </div>
  )
}

export default SlideShow