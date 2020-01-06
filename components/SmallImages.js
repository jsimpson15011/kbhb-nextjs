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
                width: 235px;
                height: 235px;
                transition: transform .5s;
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
                height: 235px;
                transition: transform .5s;
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
              justify-content: space-around;
            }
            .see-all-box a{
              display: flex;
              align-items: center;
              justify-content: center;
              background: white;
              color: ${mainTheme.accent};
              height: 235px;
              width: 235px;
              box-sizing: border-box;
              font-size: 2em;
              padding: 0 7px;
              text-decoration: none;
              font-weight: bold;
              text-align: center;
              text-transform: uppercase;
            }
            .see-all-box a:hover, .see-all-box a:focus{
              background: ${mainTheme.accent};
              color: white;
            }
          `}
      </style>
    </MaxWidthWrapper>
  )
}

export default SmallImages