import React from 'react'
import mainTheme from "../styles/katTheme"
import TouchCarousel from 'react-touch-carousel'
import NonPassiveTouchTarget from './NonPassiveTouchTarget'
import touchWithMouseHOC from 'react-touch-carousel/lib/touchWithMouseHOC'

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
        }
        a:hover, a:focus{
          background: ${mainTheme.accent};
          border: 1px solid
        }
        h2{
          margin-left: auto;
          margin-right: 3em;
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

const CarouselContainer = (props) => {
  const {cursor, carouselState, ...rest} = props
  return (
    <NonPassiveTouchTarget className='carousel-container'>
      <NonPassiveTouchTarget
        className='carousel-track'
        data-cursor={cursor}
        {...rest}
      />
    </NonPassiveTouchTarget>
  )
}
const Container = touchWithMouseHOC(CarouselContainer)


const SlideShow = ({slides}) => {
  //const slideImages = slides.map(slide => slide.image)

  const renderSlide = (index, modIndex, cursor) => {
    cursor = -cursor
    const item = slides[modIndex]
    return (
      <div
        key={index}
        className='carousel-card'
        data-index={index}
        data-modIndex={modIndex}
      >
        <img src={item.image} />
      </div>
    )
  }
  return (
    <div className='slide-show'>
      <TouchCarousel
        component={Container}
        cardCount={slides.length}
        renderCard={renderSlide}
        cardSize={2}
        cardPadCount={1}
        loop
        autoplay={3000}
      />
      <BelowSlideShow/>
    </div>
  )
}

export default SlideShow