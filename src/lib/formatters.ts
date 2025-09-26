import { useFormatter } from "next-intl";

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function useFormattedPrice() {
  const format = useFormatter();

  const formatPrice = (price: number, currency: string) => {
    return format.number(price, { style: "currency", currency: currency });
  };

  return { formatPrice };
}

export function useFormattedDate() {
  const format = useFormatter();

  const formatDate = (date: Date) => {
    return format.dateTime(date, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return { formatDate };
}
