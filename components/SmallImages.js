import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import dynamic from "next/dynamic"
import {shuffle} from "../utils/eventHelpers"
import mainTheme from "../styles/katTheme"

const LazyLoad = dynamic(() => import('react-lazyload'))

const SmallImages = ({blocks}) => {
  const shuffledBlocks = shuffle([].concat(blocks.filter(block => block.smallImage)))
  shuffledBlocks.length = 3
  const images = shuffledBlocks.map(block => {
    if (block.externalLink && block.smallImage) {
      return (
        <div className='slide-container' key={block.smallImage}>
          <a href={block.externalLink}>
            <img alt={block.alt} src={block.smallImage}/>
          </a>
          <style jsx>
            {`
              .slide-container{
                transition: transform .5s;
                width: 235px;
              margin-left: auto;
              margin-right: auto;
              margin-bottom: 7px;
              }
              .slide-container:hover{
                transform: translateY(-5%);
              }
              .slide-container a{
                display: block;
                width: 100%;
                height: 100%;
              }
              .slide-container img{
                width: 100%;
                height: 100%;
              }
            `}
          </style>
        </div>
      )
    } else if (block.smallImage) {
      return (
        <div className='slide-container' key={block.smallImage}>
          <Link href={block.slug}>
            <a>
              <LazyLoad>
                <img alt={block.alt} src={block.smallImage}/>
              </LazyLoad>
            </a>
          </Link>
          <style jsx>
            {`
              .slide-container{
                width: 235px;
                transition: transform .5s;
              margin-left: auto;
              margin-right: auto;
              margin-bottom: 7px;
              }
              .slide-container:hover{
                transform: translateY(-5%);
              }
              .slide-container a{
                display: block;
                width: 100%;
                height: 100%;
              }
              .slide-container img{
                width: 100%;
                height: 100%;
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
        <div className="see-all-box">
          <Link href="/all-events">
            <a>See all Current Promotions</a>
          </Link>
        </div>
      </div>
      <style jsx>
        {`
            .image-container{
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              align-items: flex-start;
              justify-content: space-around;
              margin-left: auto;
              margin-right: auto;
            }
            .see-all-box{
              margin-left: auto;
              margin-right: auto;
              margin-bottom: 7px;
              align-self: stretch;
            }
            .see-all-box a{
              display: flex;
              align-items: center;
              justify-content: center;
              background: white;
              color: ${mainTheme.accent};
              width: 235px;
              height: 100%;
              box-sizing: border-box;
              font-size: 1.5em;
              padding: 7px;
              text-decoration: none;
              font-weight: bold;
              text-align: center;
              text-transform: uppercase;
              box-shadow: inset 0 0 0 6px ${mainTheme.accent};
            }
            .see-all-box a:hover, .see-all-box a:focus{
              background: ${mainTheme.accent};
              box-shadow: inset 0 0 0 6px white;
              color: white;
            }
          `}
      </style>
    </MaxWidthWrapper>
  )
}

export default SmallImages