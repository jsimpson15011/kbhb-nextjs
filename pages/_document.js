// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, {Html, Head, Main, NextScript} from 'next/document'
import React from "react"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="manifest" href="/site.webmanifest"/>
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
          <meta name="msapplication-TileColor" content="#2d89ef"/>
          <meta name="theme-color" content="#ffffff"/>
          <meta name="facebook-domain-verification" content="svsx11tfrh48b66udql6z5j48zixha"/>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
               (adsbygoogle = window.adsbygoogle || []).push({
                   google_ad_client: "ca-pub-6596096319870359",
                   enable_page_level_ads: true
              });
                `
            }}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Istok+Web:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
            rel="stylesheet"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument
