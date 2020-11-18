import React from 'react'
import mainTheme from "../styles/katTheme"
import Button from "./Button"
import Link from "next/link"
import Nav from "./Nav"
import LiveSchedule from "./LiveSchedule"
import HamburgerMenu from "./HamburgerMenu"
import {useSelector} from "react-redux"
import {facebookUrl} from "../site-settings"
import Announcements from "./Announcements"
import BannerAd from "./BannerAd"

const HeaderLogoContainer = () => {

  return (
    <div className="header-logo">
      <div className="header-logo__wrapper">
        <h1>
          <Link href="/">
            <a>
              <img className="header-logo__img" alt="Big 81 Ranch Radio KBHB" src="/img/logo.png"/>
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
          .header-logo{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            max-width: ${mainTheme.maxWidth};
            width: 100%;
            margin: auto;
          }
          
          .header-logo__img{
            width: 100%;
          }
          
          .header-logo__wrapper{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-left: 21px;
            padding-right: 21px;
            box-sizing: border-box;
            max-width: 100%;
          }
          
          h1{
            margin-bottom: 14px;
            width: 320px;
            max-width: 100%;
          }
          .button-container{
         
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }
`}
      </style>
    </div>
  )
}

const Header = ({menuItems}) => {

  return (
    <div className='main-header'>
      <Nav navItems={menuItems ? menuItems.items : null}/>
      <div className="main-header__content-wrapper">
        <HeaderLogoContainer/>
        <div className="main-header__bottom">
          <div className="schedule-announcements">
            <LiveSchedule/>
            <Announcements/>
          </div>
          <div className="banner-wrapper">
            <BannerAd position="header"/>
          </div>
        </div>
      </div>
      <HamburgerMenu navItems={menuItems ? menuItems.items : null}/>
      <style jsx>
        {`
        .main-header {
          background: url("/img/windmill-background.jpg");
          background-position: 80% 20%;
          padding: 0;
          height: 700px;
          max-height: 60vh;
          display: flex;
          flex-direction: column;
          margin-bottom: 100px;
        }
        
        @media all and (min-width: 1350px){
        .main-header {
          background-position: top center;
        }
        }
        
        .main-header__bottom{
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
        }
        
        @media all and (min-width: 1220px){
          .main-header__bottom{
            transform: translateY(65%);
            margin-top: -60px;
          }
        }
        
        .banner-wrapper{
          width: 600px;
          max-width: 100%;
          min-width: 48%;
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          position: relative;
        }
        
        .schedule-announcements{
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
        .main-header__content-wrapper{
          display: flex;
          flex-direction: column;
          flex-grow: 1;
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
        body {
          line-height: 1;
        }
        ol, ul {
          list-style: none;
        }
        blockquote, q {
          quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after {
          content: '';
          content: none;
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }
        img {
          display: block;
          max-width: 100%;
        }
        body {
          line-height: 1.4;
        }
        .content ul{
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
      b, strong{
        font-weight: bold;
      }
      p{
        margin-bottom: 14px;
      }
      h2{
        font-size: 2em;
        margin-bottom: .5em;
        text-transform: uppercase;
      }
      h3{
        font-size: 1.5em;
        margin-bottom: .5em;
      }
      
      `}
      </style>
    </div>
  )
}

export default Header
