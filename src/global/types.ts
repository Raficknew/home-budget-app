export type Prices = {
  fixed: number;
  fun: number;
  future_you: number;
  incomes: number;
  balance: number;
  totalInTransactions: number;
};

export type CategoryWithTransactions = {
  name: string;
  id: string;
  icon: string;
  categoryType: "fixed" | "fun" | "future you" | "incomes";
  createdAt: Date;
  updatedAt: Date;
  householdId: string;
  transactions: {
    date: Date;
    name: string;
    id: string;
    type: "income" | "expense";
    price: number;
    memberId: string;
  }[];
}[];

export type Category = {
  name: string;
  id: string;
  icon: string;
  categoryType: "fixed" | "fun" | "future you" | "incomes";
};
