import { Suspense } from "react";
import Link from "next/link";

import NewsList from "@/components/news/newsList";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";

async function FilterHeader({ year, month }) {
  const availableYears = await getAvailableNewsYears();

  if (
    (year && !availableYears.includes(Number(year))) ||
    (month &&
      !(await getAvailableNewsMonths(Number(year))).includes(Number(month)))
  ) {
    throw new Error("Invalid filter.");
  }

  let links = availableYears;

  if (year && !month) {
    links = await getAvailableNewsMonths(Number(year));
  }

  if (year && month) {
    links = [];
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
            return (
              <li key={String(link)}>
                <Link href={href}>{String(link)}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({ year, month }) {
  let news;

  if (year && !month) {
    news = await getNewsForYear(Number(year));
  } else if (year && month) {
    news = await getNewsForYearAndMonth(Number(year), Number(month));
  }

  if (!news || news.length === 0) {
    return <p>No news found for the selected period.</p>;
  }

  return <NewsList news={news} />;
}

export default async function FilteredNewsPage({ params }) {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}
