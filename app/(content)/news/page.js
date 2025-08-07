import NewsList from "@/components/news/newsList";
import { DUMMY_NEWS } from "@/dummy-news";

export default function NewsPage() {
  return (
    <>
      <h1>News page</h1>
      <NewsList news={DUMMY_NEWS} />
    </>
  );
}
