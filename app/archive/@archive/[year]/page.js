import NewsList from "@/components/news/newsList";
import { getNewsForYearAndMonth } from "@/lib/news";
export default function FilteredNewsPage({ params }) {
  const newsYear = params.year;
  const news = getNewsForYearAndMonth(newsYear);
  return <NewsList news={news} />;
}
