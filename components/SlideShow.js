import React from 'react'
import Slider from 'react-slick'
import Link from "next/link"
import Image from "next/image"

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
          <style jsx>{`
        .slide-show img{
          display: block;
          width: 100%;
          height: auto;
        }
        .slide-show{
          opacity: 0;
          transform: translateY(-50%);
          max-width: 750px;
          width: 100%;
          margin-bottom: 14px;
          margin-left: auto;
          margin-right: auto;
        }
        .slide-container{
          display: block;
        }
      `}</style>
          </div>
          )
        }

        export default SlideShow
