import React from 'react'
import Link from '../utils/ActiveLink'
import mainTheme from '../styles/katTheme'
import {useSelector} from "react-redux"
import {withRedux} from "../lib/redux"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Nav = () => {
  const navItems = useSelector(state => state.navItems)

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

  const links = navItems.navItems.map(navItem => {
      let navItemInfo = {
        label: navItem.title,
        type: navItem.type,
        childItems: navItem.child_items ?
          navItem.child_items.map(childItem => {
            const parentSlug = childItem.object === 'page' || childItem.object === 'custom' ?
              ''
              : '/' + navItem.slug
            return Object.assign({}, childItem, {parentSlug: parentSlug})
          })
          : null
      }
      if (navItem.type === 'custom') {
        navItemInfo.key = navItem.url
        navItemInfo.href = navItem.url
      } else {
        navItemInfo.key = navItem.slug
        navItemInfo.href = '/' + navItem.slug
      }
      return (
        navItemInfo
      )
    }
  )

  return (
    <nav>
      <MaxWidthWrapper>
        <ul className="top-level-menu">
          {links.map(({key, href, label, type, childItems}) => {
              const subMenu = childItems ?
                <ul className="sub-menu">
                  {childItems.map(item => {
                    if (item.type === 'custom') {
                      return (
                        <li key={item.url}>
                          <a href={item.url}>
                            {item.title}
                          </a>
                        </li>
                      )
                    } else {
                      return (
                        <li key={item.url}>
                          <Link activeClassName=" active-link" href={`${item.parentSlug}/${item.slug}`}>
                            <a>
                              {item.title}
                            </a>
                          </Link>
                        </li>
                      )
                    }
                  })}
                </ul>
                : ''

              if (type === 'custom') {
                return (
                  <li key={key}>
                    <a href={href}>{label}</a>
                    {subMenu}
                  </li>
                )
              } else {
                return (
                  <li key={key}>
                    <Link activeClassName=" active-link" href={href}>
                      <a>{label}</a>
                    </Link>
                    {subMenu}
                  </li>
                )
              }
            }
          )}
        </ul>
      </MaxWidthWrapper>
      <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
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
      .top-level-menu {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      nav > .top-level-menu {
        padding: 4px 16px;
      }
      .top-level-menu li{
        position: relative;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        border-bottom: transparent 2px solid;
        font-weight: bold;
        color: black;
        text-decoration: none;
        text-transform: uppercase;
      }
      a:hover, a:focus {
        border-bottom: black solid 2px;
      }
      .active-link {
        border-bottom: black solid 2px;
      }
      .top-level-menu li:hover .sub-menu, .top-level-menu li:focus-within .sub-menu{
        display: block;
      }
      .sub-menu{
        background: white;
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
