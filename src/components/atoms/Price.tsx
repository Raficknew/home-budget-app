import { useFormatPrice } from "@/lib/formatters";

export function Price({
  price,
  currency,
  className,
}: {
  price: number;
  currency: string;
  className?: string;
}) {
  const formattedPrice = useFormatPrice(price, currency);

  return <p className={className}>{formattedPrice}</p>;
}
