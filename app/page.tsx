import { categories } from "../constants";
import NewsList from "./NewsList";
import React from "react";
import fetchNews from "../lib/fetchNews";

async function Home() {
  // fetch the news data
  const news: NewsResponse = await fetchNews(categories.join(","));

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return <div><NewsList news={news}/></div>;
}

export default Home;
