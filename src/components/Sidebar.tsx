"use client";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  DashboardSquare03Icon,
  ArrowDataTransferHorizontalIcon,
  Target01Icon,
  Activity01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignOutButton } from "./SignOutButton";

export function Sidebar() {
  const { locale, householdId } = useParams();
  const t = useTranslations("Sidebar");
  const currentRoute = usePathname().split("/")[3];

  console.log(currentRoute);

  const routes = [
    {
      title: t("dashboard"),
      url: `/${locale}/${householdId}`,
      icon: DashboardSquare03Icon,
    },
    {
      title: t("categories"),
      url: `/${locale}/${householdId}/categories`,
      icon: ArrowDataTransferHorizontalIcon,
    },
    {
      title: t("goals"),
      url: `/${locale}/${householdId}/goals`,
      icon: Target01Icon,
    },
    {
      title: t("charts"),
      url: `/${locale}/${householdId}/charts`,
      icon: Activity01Icon,
    },
  ];
  return (
    <div className="fixed z-10 sm:left-0 sm:rounded-none rounded-t-2xl bottom-0 bg-sidebar sm:h-full w-full sm:w-fit h-fit p-5 flex flex-row sm:flex-col items-start justify-center sm:justify-between">
      <div className="flex flex-col gap-10 items-center">
        <div className="hidden sm:block">
          <Image
            src="/images/HozzyAvatar.svg"
            alt="logo"
            width={30}
            height={30}
          />
        </div>
        <div className="flex flex-row sm:flex-col justify-center gap-5">
          {routes.map((route) => (
            <Route
              title={route.title}
              currentRoute={currentRoute ?? ""}
              url={route.url}
              key={route.title}
            >
              <HugeiconsIcon
                strokeWidth={2}
                width={20}
                height={20}
                icon={route.icon}
              />
            </Route>
          ))}
        </div>
      </div>
      <div className="self-center hidden sm:flex sm:flex-col gap-5">
        <Route
          currentRoute={currentRoute ?? ""}
          url={`/${locale}/${householdId}/settings`}
        >
          <HugeiconsIcon
            strokeWidth={2}
            width={20}
            height={20}
            icon={Settings01Icon}
          />
        </Route>
        <SignOutButton />
      </div>
    </div>
  );
}

function Route({
  children,
  url,
  currentRoute,
  title,
}: {
  children: ReactNode;
  url: string;
  currentRoute: string;
  title?: string;
}) {
  return (
    <Link
      href={url}
      className={cn(
        "self-center",
        currentRoute == url.split("/")[3] && "bg-accent p-2 rounded-full",
        currentRoute == "" &&
          title == "Dashboard" &&
          "bg-accent p-2 rounded-full"
      )}
    >
      {children}
    </Link>
  );
}
