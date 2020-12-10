import React from 'react'
import Image from "next/image"
import NewsArticle from "./NewsArticle"
import Weather from "./Weather"
import BannerAd from "./BannerAd"

const SideBar = (props) => {
  const articles = props.articles ? props.articles.map(article => {
    const category = props.categories.filter(category => {
      return category.id === article.categories[0]
    })[0]

    return (
      <React.Fragment key={article.id}>
        <BannerAd position="side"/>
        <NewsArticle
          sideBar
          article={article}
          category={category.name}
        />
        <div/>
        <style jsx>
          {
            `
            div{
              width: 100%;
              height: 2px;
              background: #edf0f1;
              margin-bottom: 14px;
            }
`
          }
        </style>
      </React.Fragment>
    )
  })
    : null

    return(
      <div className="sideBar">
        <BannerAd position="side"/>
        {
          articles ?
            articles
            : ""
        }
        {
          props.noWeather ?
            "" :
            <Weather sidebar/>
        }

        <a href="https://v7player.wostreaming.net/2825">
          <Image
            src="/img/listen-live.jpg"
            width="302"
            height="125"
            alt="Listen Live"
          />
        </a>
        <a href="https://thehomeslicegroup.com/employment/">
          <Image
            src="/img/employment_ops-2020.jpg"
            width="300"
            height="100"
            alt="Employment Opportunities"
          />
        </a>

        <iframe
          src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FKBHB-Radio%2F206573262695380&amp;width=300&amp;height=600&amp;show_faces=true&amp;colorscheme=light&amp;stream=true&amp;show_border=true&amp;header=false"
          scrolling="no" frameBorder="0" style={{border: "none", overflow: "hidden", width: "300px", height: "600px"}}
        />
        <h2>Market News</h2>
        <iframe src="https://kbhbindex.agricharts.com/pages/custom.php?id=30408" width="300" height="660" frameBorder="0"
                scrolling="no"/>

        <style jsx>
          {
            `
                    .sideBar{
                      display: flex;
                      flex-direction: column;
                    }
                    a{
                      margin-bottom: 21px;
                    }
                  `
          }
        </style>
      </div>
    )
}

export default SideBar
