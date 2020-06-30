import React from 'react'
import Link from '../utils/ActiveLink'
import mainTheme from '../styles/katTheme'
import {withRedux} from "../lib/redux"
import MaxWidthWrapper from "./MaxWidthWrapper"
import {parseNavItems} from "../utils/navHelper"

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
                      if (item.parentSlug){
                        return (
                          <li key={item.url}>
                            <Link activeClassName=" active-link"
                              href={`${item.parentSlug}/[slug]`}
                              as={`${item.parentSlug}/${item.slug}`}
                                  passHref
                            >
                              <a>
                                {item.title}
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
                                {item.title}
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
                    <a href={href}>{label}</a>
                    {subMenu}
                  </li>
                )
              } else {
                return (
                  <li key={key} className={subMenu ? 'menu-item-has-children' : ''}>
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
        padding: 0 7px;
        box-sizing: border-box;
        font-size: .9em;
      }
      a:hover, a:focus, .active-link {
        background: ${mainTheme.accent};
        color: white;
      }
      .menu-item-has-children:hover .sub-menu{
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
