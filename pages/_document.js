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
        <Head/>
        <body>
        <Main/>
        <NextScript/>
        <script src="https://mpl.tunegenie.com/js/loader.min.js?Math.random()"/>
        <script src="/scripts/tune-genie.js" async/>
        </body>
      </Html>
    )
  }
}

export default MyDocument