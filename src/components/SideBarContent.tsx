"use client";
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
import { useParams } from "next/navigation";

export function SideBarContent() {
  const { houseHoldId } = useParams();

  const routes = [
    {
      title: "Dashboard",
      url: `/${houseHoldId}`,
      icon: LayoutDashboardIcon,
    },
    {
      title: "Kategorie",
      url: `/${houseHoldId}/categories`,
      icon: ArrowLeftRightIcon,
    },
    {
      title: "Cele",
      url: `/${houseHoldId}/goals`,
      icon: CrosshairIcon,
    },
    {
      title: "Wykresy",
      url: `/${houseHoldId}/charts`,
      icon: ChartLineIcon,
    },
  ];

  return (
    <>
      <SidebarHeader className="text-foreground">Home Budget</SidebarHeader>
      <Content>
        <SidebarGroupContent>
          <SidebarMenu className="group-data-[collapsible=icon]:items-center">
            {routes.map((route) => (
              <SidebarMenuItem key={route.title}>
                <SidebarMenuButton asChild>
                  <Link href={route.url}>
                    <route.icon />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {route.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </Content>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <Link href={`/houseHoldId/admin`}>
            <SettingsIcon />
            Ustawienia
          </Link>
        </SidebarMenuButton>
        <SidebarMenuButton asChild>
          <UserButton />
        </SidebarMenuButton>
      </SidebarFooter>
    </>
  );
}
