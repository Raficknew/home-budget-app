import { Sidebar } from "@/components/organisms/Sidebar";
import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AvatarPicture } from "@/components/atoms/AvatarPicture";
import { DatePicker } from "@/components/molecules/DatePicker";

export default async function HouseholdLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ householdId: string }>;
}>) {
  const { householdId } = await params;
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <TopBar householdId={householdId} />
      <Sidebar />
      <div className="sm:pl-22 px-3 h-full">{children}</div>
    </div>
  );
}

async function TopBar({ householdId }: { householdId: string }) {
  const session = await auth();

  if (session == null) redirect("/sign-in");

  return (
    <div className="flex w-full sm:justify-between justify-end gap-2 sm:gap-0 px-5 py-3">
      <div className="h-px w-px"></div>
      <DatePicker />
      <div>
        <Link href={`/${householdId}/settings/account`} className="relative">
          <div className="absolute right-0 bottom-0 z-10 bg-green-400 w-2.5 h-2.5 rounded-full p-1"></div>
          <AvatarPicture size={10} session={session} />
        </Link>
      </div>
    </div>
  );
}
