import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SideBarContent } from "@/components/ui/SideBarContent";
import { ReactNode } from "react";

export default function HouseHoldLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider>
      <SideBar />
      <main>
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
