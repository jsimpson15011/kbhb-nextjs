import React from 'react'
import fetch from "isomorphic-unfetch"
import MainLayout from "../../components/MainLayout"
import Head from "next/head"
import DynamicContent from "../../components/DynamicContent"
import {baseUrl, siteTitle} from "../../site-settings"
import {fetcher} from "../../utils/cachedData"
import {useRouter} from "next/router"
import SimpleReactLightBox, {SRLWrapper} from "simple-react-lightbox"

const Auction = props => {
  const router = useRouter()

  if (router.isFallback || !props.auctionItems) {
    return (
      <div>
        LOADING...
      </div>
    )
  }

  const auctionItems = props.auctionItems.map(item => {

    return (
      <React.Fragment key={item.id}>
        <SimpleReactLightBox>
          <div className="item">

            <h3 dangerouslySetInnerHTML={{__html: item.title.rendered}}/>
            <div className="images">
              <SRLWrapper>
                {
                  item.meta_box.auction_images.map(image => {
                      const thumbnail = image.sizes.thumbnail
                      if (!thumbnail) {
                        return (
                          <React.Fragment key={image.full_url}>
                          </React.Fragment>
                        )
                      }
                      return (
                        <a href={image.full_url} data-attribute="SRL" key={image.full_url}>
                          <img
                            src={thumbnail.url}
                            width={thumbnail.width}
                            height={thumbnail.height}
                            alt=""
                            key={thumbnail.url}
                          />
                        </a>
                      )
                    }
                  )
                }
              </SRLWrapper>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html: item.content.rendered}}/>
          </div>
        </SimpleReactLightBox>
        <style jsx>
          {`
            .item{
              display: flex;
              flex-wrap: wrap;
              border-bottom: #6c7885 solid 1px;
              padding-bottom: 21px;
              margin-bottom: 7px;
            }
            h3{
              background: #2D3F62;
              color: white;
              padding: 14px;
              box-sizing: border-box;
              width: 100%;
            }
            .content{
              width: 700px;
              max-width: 100%;
              box-sizing: border-box;
              padding: 14px;
              margin-left: 14px;
              margin-right: 14px;
              flex-grow: 1;
              line-height: 1.6;
              font-size: 1.3rem;
              background: #f2f4fa;
            }
            .images{
              display: flex;
              flex-direction: column;
            }
            .images img{
              display: block;
              margin-bottom: 14px;
            }
`}
        </style>
      </React.Fragment>

    )
  })

  return (
    <MainLayout menuItems={props.menuItems}>
      <Head>
        <title>{siteTitle} - {props.content.title.rendered}</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <DynamicContent content={props.content}/>
      {auctionItems}
    </MainLayout>
  )
}

export async function getStaticProps() {
  const [res, auctionItems, menuItems] = await Promise.all([
    await fetch(`${baseUrl}/wp-json/wp/v2/pages?slug=auctions&_embed`),
    fetcher("https://blackhillsstore.com/wp-json/wp/v2/auction-item?orderby=menu_order&order=asc&per_page=100"),
    fetcher(`${baseUrl}/wp-json/menus/v1/menus/main-navigation`)
  ])

  const data = await res.json()


  return {
    props: {
      content: data[0],
      menuItems: menuItems,
      auctionItems: auctionItems
    },
    revalidate: 1
  }
}

export default Auction
