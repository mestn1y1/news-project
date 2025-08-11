import { supabase } from "../lib/supabaseClient";

export async function getAllNews() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;

  await new Promise((res) => setTimeout(res, 2000));
  return data;
}

export async function getNewsItem(slug) {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  await new Promise((res) => setTimeout(res, 2000));
  return data;
}

export async function getLatestNews() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("date", { ascending: false })
    .limit(3);

  if (error) throw error;

  await new Promise((res) => setTimeout(res, 2000));
  return data;
}

export async function getAvailableNewsYears() {
  const { data, error } = await supabase.rpc("get_years");

  if (error) throw error;

  await new Promise((res) => setTimeout(res, 2000));
  return data.map((row) => row.year);
}

export async function getAvailableNewsMonths(year) {
  const { data, error } = await supabase.rpc("get_months", { year });

  if (error) throw error;

  return data.map((row) => row.month);
}

export async function getNewsForYearAndMonth(year, month) {
  const monthStr = month.toString().padStart(2, "0");
  const startDate = `${year}-${monthStr}-01`;

  let nextYear = year;
  let nextMonth = month + 1;
  if (nextMonth > 12) {
    nextYear = year + 1;
    nextMonth = 1;
  }
  const nextMonthStr = nextMonth.toString().padStart(2, "0");
  const endDate = `${nextYear}-${nextMonthStr}-01`;

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .gte("date", startDate)
    .lt("date", endDate)
    .order("date", { ascending: false });

  if (error) throw error;

  await new Promise((res) => setTimeout(res, 2000));
  return data;
}

export async function getNewsForYear(year) {
  const startDate = `${year}-01-01`;
  const endDate = `${Number(year) + 1}-01-01`;

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .gte("date", startDate)
    .lt("date", endDate)
    .order("date", { ascending: false });

  if (error) throw error;

  await new Promise((res) => setTimeout(res, 2000));
  return data;
}
