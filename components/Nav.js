import React from 'react'
import Link from '../utils/ActiveLink'
import mainTheme from '../styles/katTheme'
import {withRedux} from "../lib/redux"
import MaxWidthWrapper from "./MaxWidthWrapper"
import {parseNavItems} from "../utils/navHelper"
import decodeHtmlSpecialChars from "../utils/decodeHtmlSpecialChars"

const Nav = ({navItems}) => {

  if (navItems === null) {
    return <nav>
      <ul>
        <li>.</li>
      </ul>
      <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
        background: ${mainTheme.brand};
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: black;
        text-decoration: none;
        font-size: .8em;
      }
      nav {
        text-align: center;
        background: ${mainTheme.brand};
        display: none;
      }
      @media all and (min-width: ${mainTheme.menuBreakPoint}){
        nav{
          display: block;
        }
      }
    `}</style>
    </nav>
  }

  const links = parseNavItems(navItems)

  return (
    <nav>
        <ul className="top-level-menu">
          {links.map(({key, href, label, type, childItems}) => {
              const subMenu = childItems ?
                <ul className="sub-menu">
                  {childItems.map(item => {
                    if (item.type === 'custom') {
                      return (
                        <li key={item.url}>
                          <a href={item.url}>
                            {decodeHtmlSpecialChars(item.title)}
                          </a>
                        </li>
                      )
                    } else {
                      if (item.parentSlug){
                        return (
                          <li key={item.url}>
                            <Link activeClassName=" active-link"
                              href={item.object === "page" ? `/[slug]` : `/${item.object}/[slug]`}
                              as={item.object === "page" ? `/${item.slug}` : `/${item.object}/${item.slug}`}
                                  passHref
                            >
                              <a>
                                {decodeHtmlSpecialChars(item.title)}
                              </a>
                            </Link>
                          </li>
                        )
                      } else {
                        return (
                          <li key={item.url}>
                            <Link activeClassName=" active-link"
                                  href={`/${item.slug}`}
                                  passHref
                            >
                              <a>
                                {decodeHtmlSpecialChars(item.title)}
                              </a>
                            </Link>
                          </li>
                        )
                      }
                    }
                  })}
                </ul>
                : ''

              if (type === 'custom') {
                return (
                  <li key={key} className={subMenu ? 'menu-item-has-children' : ''}>
                    <a href={href}>{decodeHtmlSpecialChars(label)}</a>
                    {subMenu}
                  </li>
                )
              } else {
                return (
                  <li key={key} className={subMenu ? 'menu-item-has-children' : ''}>
                    <Link activeClassName=" active-link" href={href}>
                      <a>{decodeHtmlSpecialChars(label)}</a>
                    </Link>
                    {subMenu}
                  </li>
                )
              }
            }
          )}
        </ul>
      <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        font-family: 'Istok Web', sans-serif;
        padding: 14px 0;
        box-sizing: border-box;
        text-align: center;
        display: none;
        background: rgb(255,255,255);
        background: -moz-linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(4,8,17,1) 100%);
        background: -webkit-linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(4,8,17,1) 100%);
        background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(4,8,17,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#040811",GradientType=1);
      }
      @media all and (min-width: ${mainTheme.menuBreakPoint}){
        nav{
          display: block;
        }
      }
      .top-level-menu {
        display: flex;
        justify-content: flex-end;
        width: 100%;
      }
      
      .top-level-menu li{
        position: relative;
      }
      li {
        display: flex;
        padding: 7px 0;
      }
      
      a {
        border-bottom: transparent 2px solid;
        color: white;
        text-decoration: none;
        padding: 0 14px;
        box-sizing: border-box;
        font-size: 1.1em;
        min-width: 130px;
      }
      
      a:hover, a:focus, .active-link {
        text-decoration: underline;
      }
      .menu-item-has-children:hover .sub-menu{
        display: block;
      }
      .sub-menu{
        background: #151515;
        position: absolute;
        display: none;
        z-index: 500;
        text-align: center;
        left: 50%;
        transform: translate(-50%, 23px);
      }
      .sub-menu a{
        width: 100%;
      }
    `}</style>
    </nav>
  )
}

export default withRedux(Nav)
