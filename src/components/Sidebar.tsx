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
    <div className="fixed z-10 sm:left-0 sm:rounded-none rounded-t-2xl bottom-0 bg-sidebar sm:h-full w-full sm:w-fit h-fit p-5 flex flex-row sm:flex-col justify-center sm:justify-between">
      <div className="flex flex-col gap-10 items-center">
        <div className="hidden sm:block">
          <Image
            src="/images/HozzyAvatar.svg"
            alt="logo"
            width={30}
            height={30}
          />
        </div>
        <div className="flex flex-row sm:flex-col gap-5 sm:gap-5">
          {routes.map((route) => (
            <div
              className="flex justify-center gap-5 sm:gap-0"
              key={route.title}
            >
              <Route
                title={route.title}
                currentRoute={currentRoute ?? ""}
                url={route.url}
                icon={route.icon}
              />
              {routes.indexOf(route) != 3 && (
                <div className="w-px sm:w-0 bg-[#616062]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="self-center hidden sm:flex sm:flex-col gap-5">
        <Route
          currentRoute={currentRoute ?? ""}
          url={`/${locale}/${householdId}/settings`}
          icon={Settings01Icon}
        />
        <SignOutButton />
      </div>
    </div>
  );
}

function Route({
  icon,
  url,
  currentRoute,
  title,
}: {
  icon: typeof Settings01Icon;
  url: string;
  currentRoute: string;
  title?: string;
}) {
  const isHovered =
    currentRoute == url.split("/")[3] ||
    (currentRoute == "" && title == "Dashboard");
  return (
    <Link
      href={url}
      className={cn(
        "self-center p-1 sm:p-2",
        isHovered && "sm:bg-accent rounded-full sm:shadow-xl"
      )}
    >
      <div className="sm:hidden flex">
        <HugeiconsIcon
          strokeWidth={2}
          width={20}
          color={cn(isHovered && "#7047EB")}
          height={20}
          icon={icon}
        />
      </div>
      <div className="hidden sm:flex">
        <HugeiconsIcon strokeWidth={2} width={20} height={20} icon={icon} />
      </div>
    </Link>
  );
}
