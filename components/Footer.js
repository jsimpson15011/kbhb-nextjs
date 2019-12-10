import React from 'react'
import MaxWidthWrapper from "./MaxWidthWrapper"
import mainTheme from "../styles/katTheme"
import Link from "next/link"

const Footer = () => {
  return (
    <div className='footer'>
      <MaxWidthWrapper display='flex' className='max-width-wrapper'>
        <div className='contact'>
          <p>katradio.com</p>
          <p>Phone number: <a href='tel:605-348-3939'>605-348-3939</a></p>
          <p>E-Mail: <a href='mailto:houston@katradio.com'>houston@katradio.com</a></p>
          <p>Address: 660 Florman STE 100</p>
          <p>Rapid City, SD 57701</p>
        </div>
        <div className='logos'>
          <Link href='/'>
            <a>
              <img src='/img/logo.png' alt='KAT 98.7'/>
            </a>
          </Link>
          <a href='https://thehomeslicegroup.com'>
            <img src='/img/homeslice-logo.png' alt='HomeSlice Media Group'/>
          </a>
        </div>
      </MaxWidthWrapper>
      <style jsx>
        {`
          .footer{
            background: ${mainTheme.brand};
            box-sizing: border-box;
            padding: 70px 15px;
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