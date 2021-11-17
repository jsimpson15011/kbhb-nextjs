import {GetServerSideProps} from 'next'
import {fetcher} from "../../utils/cachedData"
import {baseUrl} from "../../site-settings"

export const getServerSideProps = async ({res}) => {

  const threeDaysAgo = (d => new Date(d.setDate(d.getDate() - 3)))(new Date)
  const posts = await fetcher(`${baseUrl}/wp-json/wp/v2/posts?posts?after=${threeDaysAgo}&per_page=100`)

  const postsXml = posts.map(post => {
    console.log(new Date().getTimezoneOffset()/60)
    return (
      `
<url>
<loc>https://www.kbhbradio.com/news/${post.slug}</loc>
<news:news>
    <news:publication>
        <news:name>KBHB Radio</news:name>
        <news:language>en</news:language>
    </news:publication>
    <news:publication_date>${post.date}+0${new Date().getTimezoneOffset()/60}:00</news:publication_date>
    <news:title>${post.title.rendered}</news:title>
</news:news>
</url>
`
    )
  }).join('');

  const withXMLTemplate = (content) => {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${content}</urlset>`
  }

  res.setHeader('Content-Type', 'text/xml');
  res.write(withXMLTemplate(postsXml));

  res.end();

  return {
    props: {},
  }
}

// Default export to prevent next.js errors
const SitemapXML = () => {
  return null
}


export default SitemapXML