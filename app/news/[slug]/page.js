import { DUMMY_NEWS } from "@/dummy-news";

export default function NewsDetailsPage({ params }) {
  const newsSlug = params.slug;
  const { image, date, content, title } = DUMMY_NEWS.find(
    (newsItem) => newsItem.slug === newsSlug
  );
  return (
    <article className="news-article">
      <header>
        <img src={`/images/news/${image}`} />
        <h1>{title}</h1>
        <time dateTime={date}>{date}</time>
      </header>
      <p>{content}</p>
    </article>
  );
}
