import { notFound } from "next/navigation";
import React from "react";
import LiveTimestamp from "../LiveTimestamp";
import { useRouter } from "next/router";

function ArticlePage() {
  const router = useRouter();

  if (!router.query) {
    return notFound();
  }

  const { title, author, source, published_at, description, image } =
    router.query;

  // Ensure that published_at is a string before passing it to LiveTimestamp
  const time = typeof published_at === "string" ? published_at : "";

  return (
    <article>
      <section className="flex flex-col lg:flex-row pb-24 px-0 lg:px-10">
        {image && (
          <img
            src={image}
            alt={title}
            className="h-52 max-w-md mx-auto md:max-w-lg lg:max-w-xl object-cover rounded-lg shadow-md"
          />
        )}
        <div className="px-10">
          <h1 className="headerTitle px-0 no-underline pb-2">{title}</h1>
          <div className="flex divide-x-2 space-x-4">
            <h2 className="font-bold">By: {author}</h2>
            <h2 className="font-bold pl-4">Source: {source}</h2>
            <p className="pl-4">
              <LiveTimestamp time={time} />
            </p>
          </div>
          <p className="pt-4">{description}</p>
        </div>
      </section>
    </article>
  );
}

export default ArticlePage;
