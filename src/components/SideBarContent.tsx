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
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export function SideBarContent() {
  const { locale, houseHoldId } = useParams();
  const t = useTranslations("Sidebar");

  const routes = [
    {
      title: t("dashboard"),
      url: `/${locale}/${houseHoldId}`,
      icon: LayoutDashboardIcon,
    },
    {
      title: t("categories"),
      url: `/${locale}/${houseHoldId}/categories`,
      icon: ArrowLeftRightIcon,
    },
    {
      title: t("goals"),
      url: `/${locale}/${houseHoldId}/goals`,
      icon: CrosshairIcon,
    },
    {
      title: t("charts"),
      url: `/${locale}/${houseHoldId}/charts`,
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
          <Link href={`/${locale}/${houseHoldId}/settings`}>
            <SettingsIcon />
            <p>{t("settings")}</p>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </>
  );
}
