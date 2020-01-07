import {parseNavItems} from "../utils/navHelper"
import Link from "../utils/ActiveLink"
import React, {useState} from "react"
import mainTheme from "../styles/katTheme"

const HamburgerMenu = ({navItems}) => {
  const [menuIsExpanded, setMenuIsExpanded] = useState(false)

  const toggleMenu = e => {
    e.preventDefault()
    setMenuIsExpanded(!menuIsExpanded)
  }

  if (navItems === null) {
    return (
      <></>
    )
  }

  const links = parseNavItems(navItems)

  const expandedClasses = `hamburger--slider is-active`
  const collapsedClasses = `hamburger--slider`

  return (
    <>
      <button onClick={toggleMenu} className={menuIsExpanded ? expandedClasses : collapsedClasses} type="button">
        <span className="hamburger-box">
          <span className="hamburger-inner"/>
        </span>
      </button>
      <div className="hamburger-menu">
        <ul className="hamburger-menu-list">
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
                          <Link activeClassName="active-link" href={`${item.parentSlug}/${item.slug}`}>
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
      </div>
      <style jsx>
        {`          
        button{
            display: none;
          }
          @media all and (max-width: ${mainTheme.menuBreakPoint}){
            button{
              z-index: 5;
              display: block;
              position: fixed;
              top: 14px;
              right: 14px;
              background: white;
              border: none;
              padding: 7px;
          }
          }

          .hamburger-menu{
            z-index: 5;
            background: ${mainTheme.brand};
            display: flex;
            flex-direction: column;
            width: 300px;
            transition: transform .5s;
            transform: ${menuIsExpanded ? 'translateX(0)' : 'translateX(-100%)'};
            max-width: 70%;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            overflow-y: auto;
          }
          .hamburger-menu-list{
            display: flex;
            flex-direction: column;
            background: ${mainTheme.background};
            box-sizing: border-box;
            padding: 7px;
            padding-top: 14px;
            padding-bottom: 78px;
            font-size: .8em;
          }
          a{
            text-decoration: none;
            color: white;
            font-weight: bold;
            font-size: 1.5em;
            display: block;
          }
          a:hover, a:focus{
            background: white;
            color: black;
          }
          .active-link{
            background: white;
          }
          a.active-link{
            color: black;
          }
          .sub-menu{
            margin-bottom: 14px;
            font-size: .9em;
          }
          .sub-menu li{
            margin-left: 14px;
          }
`}
      </style>
    </>
  )
}

export default HamburgerMenu