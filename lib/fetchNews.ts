import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  try {
    const query = gql`
      query MyQuery(
        $access_key: String!
        $categories: String!
        $keywords: String
      ) {
        ipApi_stepzen_request {
          clientIp
        }
        myQuery(
          access_key: $access_key
          categories: $categories
          countries: "gb"
          sort: "published_desc"
          keywords: $keywords
        ) {
          data {
            author
            category
            country
            description
            image
            language
            published_at
            source
            title
            url
          }
          pagination {
            count
            limit
            offset
            total
          }
        }
      }
    `;

    const res = await fetch(
      'https://feres.stepzen.net/api/live-news/__graphql',
      {
        method: 'POST',
        //You only can choose cache or next, not both
      // cache: isDynamic ? "no-cache" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
        },
        body: JSON.stringify({
          query,
          variables: {
            access_key: process.env.MEDIASTACK_API_KEY,
            categories: category,
            keywords: keywords,
          },
        }),
      } 
    );

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const newsResponse = await res.json();

    if (!newsResponse || !newsResponse.data) {
      throw new Error('Invalid or empty response from the API');
    }

    const news = sortNewsByImage(newsResponse.data.myQuery);

    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export default fetchNews;
