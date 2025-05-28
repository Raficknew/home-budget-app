"use client";
import { useState } from "react";

type Category = {
  name: string;
  id: string;
  icon: string;
  categoryType: "fixed" | "fun" | "future you" | "incomes";
  createdAt: Date;
  updatedAt: Date;
  householdId: string;
  transactions: {
    name: string;
    id: string;
    type: "income" | "expense";
    price: number;
  }[];
}[];

export function ExpenseProgressBar({
  balance,
  categories,
}: {
  balance: number;
  categories: Category;
}) {
  const [currentCategoryType, setCurrentCategoryType] = useState("fixed");

  const categoryPricesCounted =
    countPricesOfTransactionsRelatedToTheirTypes(categories);

  function countPricesOfTransactionsRelatedToTheirTypes(categories: Category) {
    let fixed = 0;
    let fun = 0;
    let future_you = 0;

    categories.map((category) => {
      switch (category.categoryType) {
        case "fixed":
          category.transactions.map((t) => {
            fixed += t.price;
          });
          break;
        case "fun":
          category.transactions.map((t) => {
            fun += t.price;
          });
          break;
        case "future you":
          category.transactions.map((t) => {
            future_you += t.price;
          });
          break;
      }
    });

    return { fixed, fun, future_you };
  }
  return (
    <div className="flex flex-col w-[536px] gap-3">
      <div className="flex h-5 grow bg-neutral-600 rounded-sm">
        <div
          className="bg-[#7047EB] z-10 rounded-l-sm"
          style={{
            width: `${(categoryPricesCounted.fixed / balance) * 100}%`,
          }}
        ></div>
        <div
          className=" bg-[#9B8DF8]"
          style={{
            width: `${(categoryPricesCounted.fun / balance) * 100}%`,
          }}
        ></div>
        <div
          className=" bg-[#BDB6FC]"
          style={{
            width: `${(categoryPricesCounted.future_you / balance) * 100}%`,
          }}
        ></div>
      </div>
      <div className="w-full bg-[#161616] rounded-sm px-2">
        <div className="flex justify-between">
          <p>
            {(categoryPricesCounted[
              currentCategoryType as keyof typeof categoryPricesCounted
            ] /
              balance) *
              100 +
              "%"}
          </p>
          <div>ess</div>
        </div>
        <div className="flex justify-between">
          {currentCategoryType}
          <p>
            {
              categoryPricesCounted[
                currentCategoryType as keyof typeof categoryPricesCounted
              ]
            }
          </p>
        </div>
      </div>
    </div>
  );
}
