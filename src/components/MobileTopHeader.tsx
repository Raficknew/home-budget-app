import { ReactNode } from "react";
import { RouteBackButton } from "./RouteBackButton";

export function MobileTopHeader({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between sm:hidden mb-4 w-full">
      <RouteBackButton />
      <p className="text-sm font-medium">{title}</p>
      {children}
    </div>
  );
}
