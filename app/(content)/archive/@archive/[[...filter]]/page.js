import Link from "next/link";

import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import NewsList from "@/components/news/newsList";

export default async function FilteredNewsPage({ params }) {
  const filter = params.filter ?? [];

  const selectedYear = filter[0] ? Number(filter[0]) : null;
  const selectedMonth = filter[1] ? Number(filter[1]) : null;

  let news;
  let links = await getAvailableNewsYears();

  if (selectedYear && !selectedMonth) {
    news = await getNewsForYear(selectedYear);
    links = await getAvailableNewsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  const availableYears = await getAvailableNewsYears();
  const availableMonths = selectedYear
    ? await getAvailableNewsMonths(selectedYear)
    : [];

  if (
    (selectedYear && !availableYears.includes(selectedYear)) ||
    (selectedMonth && !availableMonths.includes(selectedMonth))
  ) {
    throw new Error("Invalid filter.");
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;

              return (
                <li key={String(link)}>
                  <Link href={href}>{String(link)}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}
