import React from 'react'
import mainTheme from "../styles/katTheme"
import Button from "./Button"
import Link from "next/link"
import Nav from "./Nav"
import LiveSchedule from "./LiveSchedule"
import HamburgerMenu from "./HamburgerMenu"
import Image from "next/image"
import {facebookUrl} from "../site-settings"
import BannerAd from "./BannerAd"
import ClosureNotification from "./ClosureNotification"

const HeaderLogoContainer = () => {
  /*  useEffect(() => {
      mutate("https://psa.homesliceweb.com/wp-json/wp/v2/closures").then(test => {
      })
    }, [])*/

  return (
    <div className="header-logo">
      <div className="header-logo__wrapper">
        <h1>
          <Link href="/">
            <a>
              <Image width={275} height={182} className="header-logo__img" alt="Big 81 Ranch Radio KBHB."
                     src="/img/logo.png"/>
            </a>
          </Link>
        </h1>
        <div className="button-container">
          <Button overLine="KBHB" text="On Demand" spacing="14px" width="200px" internalLink href="/on-demand"/>
          <Button overLine="Follow Us" text="On Facebook" outline spacing="14px" width="200px" href={facebookUrl}/>
        </div>
      </div>
      <style jsx>
        {`
          .header-logo {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            max-width: ${mainTheme.maxWidth};
            width: 100%;
            margin: auto;
          }

          .header-logo__img {
            width: 100%;
          }

          .header-logo__wrapper {
            display: none;
            flex-direction: column;
            align-items: center;
            padding-left: 21px;
            padding-right: 21px;
            box-sizing: border-box;
            max-width: 100%;
          }

          h1 {
            margin-bottom: 14px;
            max-width: 100%;
          }

          .button-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            flex-shrink: 1;
            width: 100%;
          }

          @media all and (min-width: ${mainTheme.menuBreakPoint}) {
            .header-logo__wrapper {
              display: flex;
            }
          }
        `}
      </style>
    </div>
  )
}

const Header = ({menuItems}) => {

  return (
    <div className="main-header">
      <Nav navItems={menuItems ? menuItems.items : null}/>
      <h1 className="tiny-logo hide-on-desktop">
        <Link href="/">
          <a>
            <Image width={64} height={43} className="header-logo__img" alt="Big 81 Ranch Radio KBHB"
                   src="/img/tiny-logo.png"/>
          </a>
        </Link>
      </h1>
      <div className="main-header__content-wrapper">
        <HeaderLogoContainer/>

        <div className="main-header__bottom">

          <div className="schedule-announcements">
            <LiveSchedule/>
            <div className="outer-wrapper">
              <ClosureNotification/>
              <Link href={'/category/obituaries'}>
                <a>Obituaries</a>
              </Link>
              <Link href={'/auctions'}>
                <a>Auctions</a>
              </Link>
              <Link href={'/bull-sales'}>
                <a>Bull Sale Calendar</a>
              </Link>
              <Link href={'/on-demand'}>
                <a className="hide-on-desktop">On Demand</a>
              </Link>

            </div>
            {/*<Announcements/>*/}

          </div>
          <div className="banner-wrapper">
            {/*<a className="auction-button" href="https://blackhillsstore.com/">Summer Fun Auction</a>*/}
            <BannerAd position="header"/>
          </div>
        </div>
      </div>
      <HamburgerMenu navItems={menuItems ? menuItems.items : null}/>
      <style jsx>
        {`
          .main-header {
            background: #111010;
            padding: 0;
            height: auto;
            display: flex;
            flex-direction: row;
            position: sticky;
            top: 0;
            z-index: 500;
            box-shadow: 0 4px 7px -1px rgb(14 14 14), 0 4px 4px 0 rgb(100 100 100), 0 1px 3px 0 rgb(0 0 0);
          }

          .tiny-logo {
            flex-shrink: 0;
            padding-top: 4px;
            padding-bottom: 4px;
          }

          .outer-wrapper {
            box-sizing: border-box;
            padding-right: 14px;
            max-width: 100%;
            z-index: 2;
            display: flex;
            flex-wrap: nowrap;
            flex-shrink: 1;
            overflow-x: auto;
          }

          /*@media all and (min-width: 1217px){
            .outer-wrapper{
              position: absolute;
            }
          }*/
          a {
            background: transparent;
            padding: 4px;
            font-weight: normal;
            text-decoration: none;
            color: white;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.65));
            margin-left: 14px;
            margin-top: 7px;
            white-space: nowrap;
          }

          .auction-button {
            color: white;
            margin-bottom: .5rem;
            padding: .5rem;
            border-radius: .5rem;
            font-size: 1.5rem;
            background: rgb(58, 123, 185);
            background: -moz-radial-gradient(circle, rgba(58, 123, 185, 1) 0%, rgba(29, 45, 99, 1) 100%);
            background: -webkit-radial-gradient(circle, rgba(58, 123, 185, 1) 0%, rgba(29, 45, 99, 1) 100%);
            background: radial-gradient(circle, rgba(58, 123, 185, 1) 0%, rgba(29, 45, 99, 1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#3a7bb9",endColorstr="#1d2d63",GradientType=1);
            transition: color .2s, background-color .2s;
          }

          .auction-button:hover {
            background: white;
            color: #2F629B;
          }

          @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
            .main-header {
              background: url("/img/windmill-background.jpg");
            }
          }


          @media all and (min-width: 1350px) {
            .main-header {
              background-position: top center;
            }
          }

          .main-header__bottom {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
          }

          /*          @media all and (min-width: 1220px) {
                      .main-header__bottom {
                        transform: translateY(65%);
                        margin-top: -60px;
                      }
                    }*/

          .banner-wrapper {
            width: 600px;
            max-width: 100%;
            min-width: 48%;
            align-items: center;
            flex-wrap: wrap;
            position: relative;
            display: none;
            flex-direction: column;
            justify-content: center;
          }

          .schedule-announcements {
            width: auto;
            max-width: 100%;
            min-width: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            flex-wrap: wrap;
            position: relative;
            margin-bottom: 0;
          }

          .main-header__content-wrapper {
            flex-direction: column;
            flex-grow: 0;
            flex-shrink: 1;
            display: flex;
            width: 100%;
            overflow-x: auto;
          }

          @media all and (min-width: ${mainTheme.menuBreakPoint}) {
            .main-header {
              background: url("/img/windmill-background.webp");
              background-position: 80% 20%;
              padding: 0;
              height: 450px;
              display: flex;
              flex-direction: column;
              margin-bottom: 100px;
              position: relative;
            }

            .main-header__content-wrapper {
              display: flex;
              overflow: visible;
            }

            .outer-wrapper {
              overflow: visible;
            }

            .banner-wrapper {
              display: flex;
            }

            a {
              background: ${mainTheme.background};
              padding: 7px;
              font-weight: bold;
              text-decoration: none;
              color: ${mainTheme.accent};
              filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.65));
              margin-left: 14px;
              margin-top: 7px;
              white-space: nowrap;
            }

            a:hover, a:focus {
              background: ${mainTheme.accent};
              color: white;
            }

            .schedule-announcements {
              width: 600px;
              max-width: 100%;
              min-width: 48%;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              flex-wrap: wrap;
              position: relative;
              margin-bottom: 14px;
            }

            .hide-on-desktop {
              display: none;
            }
          }

        `}
      </style>
      <style jsx global>
        {`
          /* http://meyerweb.com/eric/tools/css/reset/ 
     v2.0 | 20110126
     License: none (public domain)
  */

          html, body, div, span, applet, object, iframe,
          h1, h2, h3, h4, h5, h6, p, blockquote, pre,
          a, abbr, acronym, address, big, cite, code,
          del, dfn, em, img, ins, kbd, q, s, samp,
          small, strike, strong, sub, sup, tt, var,
          b, u, i, center,
          dl, dt, dd, ol, ul, li,
          fieldset, form, label, legend,
          table, caption, tbody, tfoot, thead, tr, th, td,
          article, aside, canvas, details, embed,
          figure, figcaption, footer, header, hgroup,
          menu, nav, output, ruby, section, summary,
          time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            vertical-align: baseline;
          }

          /* HTML5 display-role reset for older browsers */
          article, aside, details, figcaption, figure,
          footer, header, hgroup, menu, section {
            display: block;
          }
          video{
            max-width: 100%;
          }
          .wp-video{
            max-width: 100%;
          }

          body {
            line-height: 1;
          }

          ol, ul {
            list-style: none;
          }

          blockquote, q {
            quotes: none;
          }

          a {
            overflow-wrap: break-word;
          }

          blockquote:before, blockquote:after,
          q:before, q:after {
            content: none;
          }

          .wp-caption {
            max-width: 100%;
          }

          table {
            border-collapse: collapse;
            border-spacing: 0;
          }

          img {
            //display: block;
            max-width: 100%;
            height: auto;
          }

          iframe {
            max-width: 100%;
          }

          body {
            line-height: 1.4;
          }

          .content ul {
            list-style: disc;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0;
            margin-inline-end: 0;
            padding-inline-start: 1em;
          }

          /*.contents{
          background: white;
          color: #3E3E3E;
          padding: 1px;
        }*/
          b, strong {
            font-weight: bold;
          }

          p {
            margin-bottom: 14px;
          }

          h2 {
            font-size: 2em;
            margin-bottom: .5em;
            text-transform: uppercase;
          }

          h3 {
            font-size: 1.5em;
            margin-bottom: .5em;
          }

          .aligncenter {
            display: block;
            margin-left: auto;
            margin-right: auto;
          }

          .alignleft {
            float: left;
            margin-right: 14px;
            margin-bottom: 14px;
          }

          .alignright {
            float: right;
            margin-left: 14px;
            margin-bottom: 14px;
          }

          .wp-caption-text {
            font-size: .8rem;
            font-style: italic;
            margin-bottom: 14px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            max-width: 100%;
            margin-top: 7px;
          }

        `}
      </style>
    </div>
  )
}

export default Header
