import React from 'react'
import MainLayout from "../../components/MainLayout"
import Head from "next/dist/next-server/lib/head"
import {baseUrl, siteTitle} from "../../site-settings"
import {fetcher} from "../../utils/cachedData"
import Image from "next/image"

const BullSalesPage = props => {
  const nonExpired = props.sales.filter(sale => {
    return Date.now() / 1000 < sale.meta_box.custom_expiration_date
  })

  const salesJSX = nonExpired.map(item => {
    return (
      <div className="item" key={item.id}>
        <h3 dangerouslySetInnerHTML={{__html: item.title.rendered}}/>
        <div className="images">
          <Image
            src={item.images[0]}
            width={item.images[1]/2}
            height={item.images[2]/2}
            layout="responsive"
            alt=""
          />
        </div>
          <div className="content" dangerouslySetInnerHTML={{__html: item.content.rendered}}/>
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
              width: 250px;
              max-width: 100%;
            }
            .images img{
              display: block;
              margin-bottom: 14px;
            }
`}
        </style>
      </div>
    )
  })

  return (
    <MainLayout>
      <Head>
        <title>{siteTitle} - Bull Sales</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <Image
        src="/img/bull_sale.png"
        width="701px"
        height="218px"
        layout="responsive"
      />
      {salesJSX}
      <style jsx>
        {
          `
            button{
              background: #3B73B1;
              color: white;
              font-size: 1.5rem;
              display: block;
              margin-left: auto;
              margin-right: auto;
              padding: 7px 48px;
              border: none;
              box-shadow: gray 2px 2px 2px;
            }
`
        }
      </style>
    </MainLayout>
  )
}

export async function getStaticProps() {
  try {
    const [sales] = await Promise.all([
      fetcher(`${baseUrl}/wp-json/wp/v2/bull-sale?per_page=100`)
    ])

    return {
      props: {
        sales: sales
      },
      revalidate: 1
    }
  } catch (e) {
    console.log(e)
    return {props: {}}
  }
}

export default BullSalesPage
