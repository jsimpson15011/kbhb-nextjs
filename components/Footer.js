import React from 'react'
import MaxWidthWrapper from "./MaxWidthWrapper"
import mainTheme from "../styles/katTheme"
import Link from "next/link"
import {email, phone, siteTitle} from "../site-settings"
import Image from "next/image"

const Footer = () => {
  return (
    <div id='footer' className='footer'>
      <MaxWidthWrapper display='flex' className='max-width-wrapper'>
        {/*<div className='ad-wrapper'>
          <Ad
            style={{display: "block"}}
            slot="8368186869"
            format="auto"
            responsive="true"
          />
        </div>*/}
        <div className='contact'>
          <p>Phone number: <a href={`tel:${phone}`}>{phone}</a></p>
          <p>E-Mail: <a href={`mailto:${email}`}>{email}</a></p>
          <p>1612 Junction Avenue, Suite #4</p>
          <p>Sturgis, SD 57785</p>
          <a className="social-icon" href="https://www.facebook.com/kbhbradio"><img width={32} height={32} alt="" src="/img/icons/facebook-32.png"/> Follow us on Facebook</a>
          <a className="social-icon" href="https://twitter.com/KbhbNews"><img width={32} height={32} alt="" src="/img/icons/twitter-32.png"/> Follow us on Twitter</a>
        </div>
        <div className='logos'>
          <Link href='/'>
            <a>
                <Image width={275} height={182} src='/img/logo.png' alt={`${siteTitle}`}/>
            </a>
          </Link>
          <a href='https://thehomeslicegroup.com'>
              <Image width={177} height={146} src='/img/homeslice-logo.png' alt='HomeSlice Media Group'/>
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
          .contact a.social-icon{
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            line-height: 1;
            color: #2F629B;
            text-decoration: underline;
          }
          .social-icon img{
            margin-right: .5rem;
            width: 28px;
            height: auto;
          }
          .ad-wrapper{
            width: 100%;
            margin-bottom: 28px;
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
