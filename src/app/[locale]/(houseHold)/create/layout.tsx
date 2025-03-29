import { ReactNode } from "react";

export default async function HouseHoldLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="flex justify-center h-screen w-full items-center">
      <div className="flex flex-col justify-center grow items-center max-w-[400px] bg-card p-6 text-center rounded-sm gap-y-5 max-h-[480px] border-foreground border">
        {children}
      </div>
    </main>
  );
}
