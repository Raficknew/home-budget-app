import { Sidebar } from "@/components/Sidebar";
import { ReactNode } from "react";

export default async function HouseholdLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="pt-3">
      <Sidebar />
      <div className="absolute left-0 sm:left-20">{children}</div>
    </div>
  );
}
