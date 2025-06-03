"use client";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { useFormatPrice } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

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

const countPricesOfTransactionsRelatedToTheirTypes = (
  balance: number,
  categories: Category
) => {
  let fixed = 0;
  let fun = 0;
  let future_you = 0;
  let left = 0;

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

  left = balance;

  return { fixed, fun, future_you, left };
};

const returnChangeOption = (currentCategoryType: string) => {
  const options = ["fixed", "fun", "future_you", "left"];

  const currentIndex = options.indexOf(currentCategoryType);

  let nextOption = "";
  let backOption = "";
  if (currentCategoryType == "fixed") {
    nextOption = options[(currentIndex + 1) % options.length] ?? "";
    backOption = "left";
  } else if (currentCategoryType == "left") {
    nextOption = options[0] ?? "";
    backOption = options[(currentIndex - 1) % options.length] ?? "";
  } else {
    nextOption = options[(currentIndex + 1) % options.length] ?? "";
    backOption = options[(currentIndex - 1) % options.length] ?? "";
  }

  return { nextOption, backOption };
};

const checkGoalProgress = (categoryType: string, value: string) => {
  if (categoryType === "left") return { expected: "", progress: "" };

  let expected = "";
  let progress = "";

  const goalMap = {
    fixed: "50%",
    fun: "30%",
    future_you: "20%",
  };

  expected = goalMap[categoryType as keyof typeof goalMap] ?? "";

  if (value > expected) {
    progress = "TO_MUCH";
  } else if (value === expected) {
    progress = "IDEALLY";
  } else {
    progress = "TO_LITTLE";
  }

  return { expected, progress };
};

export function ExpenseProgressBar({
  balance,
  categories,
  currency,
}: {
  balance: number;
  categories: Category;
  currency: string;
}) {
  const t = useTranslations("Dashboard.ExpenseTracker");
  const [currentCategoryType, setCurrentCategoryType] = useState("fixed");

  const categoryPricesCounted = countPricesOfTransactionsRelatedToTheirTypes(
    balance,
    categories
  );

  const historicalBalance =
    balance +
    categoryPricesCounted.fixed +
    categoryPricesCounted.fun +
    categoryPricesCounted.future_you;

  const changeCurrentType = returnChangeOption(currentCategoryType);

  const currentCategoryTypePrice =
    categoryPricesCounted[
      currentCategoryType as keyof typeof categoryPricesCounted
    ];

  const assigned =
    (categoryPricesCounted[
      currentCategoryType as keyof typeof categoryPricesCounted
    ] /
      historicalBalance) *
    100;

  const formattedPrice = useFormatPrice(currentCategoryTypePrice, currency);

  const goalProgress = checkGoalProgress(currentCategoryType, assigned + "%");

  return (
    <div className="flex flex-col w-full gap-3">
      <ProgressBar
        categoryPricesCounted={categoryPricesCounted}
        balance={historicalBalance}
      />
      <div className="flex flex-col gap-2 w-full bg-[#161616] rounded-lg py-2 px-4">
        <div className="flex justify-between">
          <div className="flex gap-1">
            <p
              className={cn(
                "text-lg",
                goalProgress.progress == "IDEALLY" && "text-green-400",
                goalProgress.progress == "TO_MUCH" && "text-red-400",
                goalProgress.progress == "TO_LITTLE" && "text-green-200",
                assigned < 0 && "text-red-400"
              )}
            >
              {assigned.toFixed(2) + "%"}
            </p>
            <p className="self-end text-[10px] text-white/50">
              {goalProgress.expected && `CEL ${goalProgress.expected}`}
            </p>
          </div>
          <div className="flex items-center gap-1 *:rounded-full *:bg-white *:text-black *:cursor-pointer ">
            <HugeiconsIcon
              onClick={() =>
                setCurrentCategoryType(changeCurrentType.backOption)
              }
              strokeWidth={3}
              size={16}
              icon={ArrowLeft01Icon}
            />
            <HugeiconsIcon
              onClick={() =>
                setCurrentCategoryType(changeCurrentType.nextOption)
              }
              strokeWidth={3}
              size={16}
              icon={ArrowRight01Icon}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-[#7047EB]">
            {t(`${currentCategoryType}`)}
          </p>
          <p className="text-lg font-semibold">{formattedPrice}</p>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({
  categoryPricesCounted,
  balance,
}: {
  categoryPricesCounted: { fixed: number; fun: number; future_you: number };
  balance: number;
}) {
  return (
    <div className="flex h-6 grow bg-neutral-600 rounded-sm">
      <div
        className="bg-[#7047EB] z-10 rounded-l-sm"
        style={{
          width: `${(categoryPricesCounted.fixed / balance) * 100}%`,
        }}
      ></div>
      <div
        className=" bg-[#9B8DF8] z-10"
        style={{
          width: `${(categoryPricesCounted.fun / balance) * 100}%`,
        }}
      ></div>
      <div
        className=" bg-[#BDB6FC] z-10 rounded-r-sm"
        style={{
          width: `${(categoryPricesCounted.future_you / balance) * 100}%`,
        }}
      ></div>
    </div>
  );
}
