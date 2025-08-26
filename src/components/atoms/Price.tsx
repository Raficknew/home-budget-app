import { useFormattedPrice } from "@/lib/formatters";

export function Price({
  price,
  currency,
  className,
}: {
  price: number;
  currency: string;
  className?: string;
}) {
  const formattedPrice = useFormattedPrice(price, currency);

  return <p className={className}>{formattedPrice}</p>;
}
