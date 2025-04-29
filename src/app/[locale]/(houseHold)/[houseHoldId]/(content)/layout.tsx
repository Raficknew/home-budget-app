import { Sidebar } from "@/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReactNode } from "react";
import { User02FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HouseholdLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="pt-3">
      <TopBar />
      <Sidebar />
      <div className="absolute left-0 sm:left-20">{children}</div>
    </div>
  );
}

async function TopBar() {
  const session = await auth();

  if (session == null) redirect("/sign-in");
  return (
    <div className="fixed right-5">
      <div className="absolute right-[-3px] bottom-0 z-10 bg-green-400 w-2.5 h-2.5 rounded-full p-1"></div>

      <Avatar>
        <AvatarImage src={session?.user.image ?? ""} />
        <AvatarFallback className="bg-accent">
          <HugeiconsIcon icon={User02FreeIcons} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
