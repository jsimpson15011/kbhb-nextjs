import Parser from "rss-parser"
import {newsUrl} from "../site-settings"


const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

async function getNewsItems(NumberOfNewsItems) {
  const kbhbParser = new Parser({
    customFields: {
      item: [
        ['image', 'image']
      ]
      ,
    }
  })

  const countryParser = new Parser({
    customFields: {
      item: [
        ['media:group', "media:group", {keepArray: true}]
      ]
    }
  })

  const kbhbFeed = await kbhbParser.parseURL('https://kbhbradio.com/rss.php')

  const musicNewsFeed = await countryParser.parseURL(CORS_PROXY + newsUrl)

  musicNewsFeed.items.length = NumberOfNewsItems ? NumberOfNewsItems : 3

  kbhbFeed.items.length = NumberOfNewsItems ? NumberOfNewsItems : 3

  return {
    musicNewsFeed: musicNewsFeed,
    kbhbFeed: kbhbFeed
  }
}

export default {
  getNewsItems
}