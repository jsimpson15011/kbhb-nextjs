import React from 'react'
import MaxWidthWrapper from "./MaxWidthWrapper"
import mainTheme from "../styles/katTheme"
import dynamic from "next/dynamic"

const LazyLoad = dynamic(() => import('react-lazyload'))
import Link from "next/link"
import {email, phone, siteTitle} from "../site-settings"

const Footer = () => {
  return (
    <div id='footer' className='footer'>
      <MaxWidthWrapper display='flex' className='max-width-wrapper'>
        <div className='contact'>
          <p>Phone number: <a href={`tel:${phone}`}>{phone}</a></p>
          <p>E-Mail: <a href={`mailto:${email}`}>{email}</a></p>
          <p>1612 Junction Avenue, Suite #1</p>
          <p>Sturgis, SD 57785</p>
        </div>
        <div className='logos'>
          <Link href='/'>
            <a>
              <LazyLoad>
                <img src='/img/logo.png' alt={`${siteTitle}`}/>
              </LazyLoad>
            </a>
          </Link>
          <a href='https://thehomeslicegroup.com'>
            <LazyLoad>
              <img src='/img/homeslice-logo.png' alt='HomeSlice Media Group'/>
            </LazyLoad>
          </a>
        </div>
      </MaxWidthWrapper>
      <style jsx>
        {`
          .footer{
            background: ${mainTheme.brand};
            box-sizing: border-box;
            padding: 40px 15px;
          }
          .contact a{
            color: black;
            text-decoration: none;
          }
          .contact {
            font-weight: bold;
            margin-bottom: 15px;
          }
          .logos{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
          }
          .logos a{
            display: block;
            margin-bottom: 15px;
          }
          .logos a:first-child{
            margin-right: 40px;
          }
        `}
      </style>
    </div>
  )
}

export default Footer
