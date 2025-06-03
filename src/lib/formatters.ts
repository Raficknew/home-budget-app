import { useFormatter } from "next-intl";

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function useFormatPrice(price: number, currency: string) {
  const format = useFormatter();

  return format.number(price, { style: "currency", currency: currency });
}
