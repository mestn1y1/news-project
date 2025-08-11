import NewsList from "@/components/news/newsList";
import { DUMMY_NEWS } from "@/dummy-news";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  const news = getAllNews();

  return (
    <>
      <h1>News page</h1>
      <NewsList news={news} />
    </>
  );
}
