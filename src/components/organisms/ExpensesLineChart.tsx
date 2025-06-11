import { Prices } from "@/global/types";

export function ExpensesLineChart({ prices }: { prices: Prices }) {
  return <div className="bg-card w-3/5 ronded-lg">{prices.balance}</div>;
}
