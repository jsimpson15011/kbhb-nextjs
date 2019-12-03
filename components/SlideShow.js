import React from 'react'
import mainTheme from "../styles/katTheme"

const BelowSlideShow = () => {
  return(
    <div>
      <h2>The Black Hills' Favorite Country Station</h2>
      <a href="http://kout.tunegenie.com/#listenlive" className='listen-online'>Listen Online Now</a>
      <a href="https://thehomeslicegroup.com/" className='homeslice-media'>Homeslice Media Group</a>
      <style jsx>{`
        div{
          background: ${ mainTheme.accent };
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
        }
        h2{
          margin-left: auto;
          margin-right: 3em;
        }
        .listen-online{
          background: black;
        }
        .homeslice-media{
          background: #104b7d;
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

const SlideShow = ({ slideShowInfo }) => {
  return(
    <div>
      <BelowSlideShow/>
    </div>
  )
}

export default SlideShow