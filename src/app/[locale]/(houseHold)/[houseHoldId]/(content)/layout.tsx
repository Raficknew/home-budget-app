import { SideBarContent } from "@/components/SideBarContent";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { ReactNode } from "react";

export default async function HouseholdLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SideBar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}

function SideBar() {
  return (
    <Sidebar collapsible="icon">
      <SideBarContent />
    </Sidebar>
  );
}
