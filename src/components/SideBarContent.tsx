import {
  LayoutDashboardIcon,
  ArrowLeftRightIcon,
  CrosshairIcon,
  ChartLineIcon,
  SettingsIcon,
} from "lucide-react";

import Link from "next/link";
import {
  SidebarContent as Content,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { UserButton } from "@clerk/nextjs";

const routes = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Tranzakcje",
    url: `/houseHoldId/transactions`,
    icon: ArrowLeftRightIcon,
  },
  {
    title: "Cele",
    url: `/houseHoldId/goals`,
    icon: CrosshairIcon,
  },
  {
    title: "Wykresy",
    url: `/houseHoldId/charts`,
    icon: ChartLineIcon,
  },
];

export function SideBarContent() {
  return (
    <>
      <SidebarHeader className="text-foreground">Home</SidebarHeader>
      <Content>
        <SidebarGroupContent>
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.title}>
                <SidebarMenuButton asChild>
                  <Link href={route.url}>
                    <route.icon />
                    {route.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </Content>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={`/houseHoldId/admin`}>
              <SettingsIcon />
              Ustawienia
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton asChild>
            <UserButton />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </>
  );
}
