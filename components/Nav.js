import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import unfetch from "isomorphic-unfetch"
import mainTheme from '../styles/katTheme'

const Nav = () => {
  const [navItems, setNavItems] = useState(null)
  useEffect(() => {
    async function getNavigationItems() {
      const navItemsRes = await fetch('https://katcms.homesliceweb.com/wp-json/menus/v1/menus/main-navigation')
      const navItemsData = await navItemsRes.json()
      setNavItems(navItemsData.items)
    }

    getNavigationItems()
  },[])

  if(navItems === null){
    return <nav>
      <ul><li>.</li></ul>
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
    `}</style>
    </nav>
  }

  const links = navItems.map(navItem => {
      return (
        {
          key: navItem.slug,
          href: navItem.slug,
          label: navItem.title
        }
      )
    }
  )

  return (
    <nav>
      <ul>
        {links.map(({key, href, label}) => (
          <li key={key}>
            <a href={href}>{label}</a>
          </li>
        ))}
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
    `}</style>
    </nav>
  )
}

export default Nav
