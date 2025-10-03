import { type Transaction } from "../hooks/useTransactions";

interface AnyObject {
  [key: string]: any
}

export function filterLast30Days(transactions: any[], date: string) {
  const today = new Date(date);
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  return transactions.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= thirtyDaysAgo && itemDate <= today;
  });
}

export function getTimesPerDate(transaction: Transaction[]): { date: string, count: unknown }[] {
  return Object.entries(
    transaction.reduce((acc: AnyObject, item) => {
      acc[item.date] = (acc[item.date] || 0) + 1;
      return acc;
    }, {})
  )
    .sort(([dateA], [dateB]) => new Date(dateA).valueOf() - new Date(dateB).valueOf())
    .map(([date, count]) => ({ date, count }));
}
