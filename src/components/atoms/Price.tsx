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
  const { formatPrice } = useFormattedPrice();

  return <p className={className}>{formatPrice(price, currency)}</p>;
}
