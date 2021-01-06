import React from 'react'
import mainTheme from "../styles/katTheme"
import Slider from 'react-slick'
import Link from "next/link"
import Image from "next/image"
import {belowSlidesMessage, listenLiveUrl} from "../site-settings"

const BelowSlideShow = () => {
  return (
    <div>
      <h2>{belowSlidesMessage}</h2>
      <a href={listenLiveUrl} className='listen-online'>Listen Online Now</a>
      <a href="https://thehomeslicegroup.com/" className='homeslice-media'>Homeslice Media Group</a>
      <style jsx>{`
        div {
          background: ${mainTheme.accent};
          color: white;
          display: flex;
          flex-wrap: wrap;
          text-transform: uppercase;
          align-items: center;
          font-weight: bold;
          letter-spacing: 2px;
          margin-bottom: 14px;
          margin-top: -6px;
        }

        a:hover, a:focus {
          background: ${mainTheme.accent};
          border: 1px solid
        }

        h2 {
          margin-left: auto;
          margin-right: 3em;
          margin-bottom: 0;
          font-size: 1em;
        }

        .listen-online {
          background: black;
          border: 1px solid black;
        }

        .homeslice-media {
          background: #104b7d;
          border: 1px solid #104b7d;
          margin-right: 2em;
        }

        .listen-online, .homeslice-media {
          color: white;
          text-decoration: none;
          padding: .3em .8em;
        }
      `}</style>
    </div>
  )
}

const SlideShow = ({slides}) => {

  const settings = {
    dots: true,
    lazyLoad: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000
  }

  if (!slides) {
    return (
      <BelowSlideShow/>
    )
  }

  return (
    <div className='slide-show'>
      <Slider {...settings}>
        {slides
          .map(slide => {
            if (slide.externalLink && slide.image) {
              return (
                <a className='slide-container' key={slide.image} href={slide.externalLink}>
                  <Image
                    alt={slide.alt}
                    src={slide.image}
                    height={slide.imageHeight}
                    width={slide.imageWidth}
                    layout="responsive"
                  />
                </a>
              )
            } else if (slide.image && !slide.slideIsImageOnly) {
              return (
                <Link className='slide-container' key={slide.image} href={`/${slide.parentSlug}/[slug]`}
                      as={`${slide.slug}`}>
                  <a>
                    <Image
                      alt={slide.alt}
                      src={slide.image}
                      height={slide.imageHeight}
                      width={slide.imageWidth}
                      layout="responsive"
                    />
                  </a>
                </Link>
              )
            } else if (slide.image) {
              return (
                <Image
                  className='slide-container' key={slide.image}
                  alt={slide.alt}
                  src={slide.image}
                  height={slide.imageHeight}
                  width={slide.imageWidth}
                  layout="responsive"
                />
              )
            }
          })}
          </Slider>
          <BelowSlideShow/>
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
