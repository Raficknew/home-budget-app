"use client";
import { capitalize } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { pl, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function DatePicker() {
  let defaultDate: Date = new Date();
  const defaultDateString = useSearchParams().get("date");

  if (defaultDateString != null) {
    defaultDate = new Date(defaultDateString);
  }

  const [isOpened, setIsOpened] = useState(false);
  const [date] = useState(defaultDate);
  const [currentMonth, setCurrentMonth] = useState<number | null>(
    defaultDate.getMonth()
  );
  const [year, setYear] = useState<number | null>(defaultDate.getFullYear());
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const startYear = 2024;
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const locale = useLocale();
  let currentLocale = pl;
  switch (locale) {
    case "pl":
      currentLocale = pl;
      break;
    case "en":
      currentLocale = enUS;
      break;
  }

  const months = Array.from(
    { length: 12 },
    (_, i) => new Date(date.getFullYear(), i, 1)
  );

  const handleYearChange = (year: number) => {
    setYear(year);
    date.setFullYear(year);
    setCurrentMonth(null);
  };

  const handleDateChange = (month: number) => {
    const searchParams = new URLSearchParams();

    setCurrentMonth(month);
    date.setMonth(month);
    searchParams.set("date", date.toISOString());
    router.push(`?${searchParams}`);
  };

  return (
    <div className="flex flex-col items-center z-10 ml-25">
      <div
        className="bg-card h-full w-[270px] text-center py-2 rounded-lg cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        <p className="font-semibold">
          {currentMonth
            ? capitalize(format(date, "MMMM yyyy", { locale: currentLocale }))
            : capitalize(format(date, "yyyy", { locale: currentLocale }))}
        </p>
      </div>
      {isOpened && (
        <div className="fixed top-11 grid grid-cols-4 gap-3 text-center bg-card p-5 rounded-lg drop-shadow-xl">
          {!year &&
            years.map((callendarYear) => (
              <div
                key={callendarYear}
                className={cn(
                  "cursor-pointer px-2 py-1 text-sm rounded-full hover:bg-white/50"
                )}
                onClick={() => handleYearChange(callendarYear)}
              >
                {callendarYear}
              </div>
            ))}

          {year &&
            months.map((month) => (
              <div
                key={month.getMonth()}
                className={cn(
                  "cursor-pointer px-2 py-1 text-sm rounded-full",
                  month.getMonth() === currentMonth &&
                    month.getFullYear() === year &&
                    "bg-foreground/10"
                )}
                onClick={() =>
                  month != date && handleDateChange(month.getMonth())
                }
              >
                {capitalize(format(month, "MMMM", { locale: currentLocale }))}
              </div>
            ))}
          <div
            className="absolute left-2 cursor-pointer"
            onClick={() => {
              setYear(null);
              setCurrentMonth(null);
            }}
          >
            x
          </div>
        </div>
      )}
    </div>
  );
}
