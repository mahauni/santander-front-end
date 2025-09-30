import { Transaction } from "../hooks/useTransactions";

export function filterLast30Days(transactions: any[]) {
  const today = new Date("2025-05-30");
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  return transactions.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= thirtyDaysAgo && itemDate <= today;
  });
}

export function getTimesPerDate(transaction: Transaction[]) {
  return Object.entries(
    transaction.reduce((acc, item) => {
      acc[item.date] = (acc[item.date] || 0) + 1;
      return acc;
    }, {})
  )
    .sort(([dateA], [dateB]) => new Date(dateA).valueOf() - new Date(dateB).valueOf())
    .map(([date, count]) => ({ date, count }));
}
