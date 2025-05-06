"use client";
import Link from "next/link";
import {
  DashboardCircleIcon,
  Home01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePathname } from "next/navigation";

export function SettingsNavigationBar({
  householdId,
}: {
  householdId: string;
}) {
  const currentPath = usePathname().split("/")[4];

  const navigationButtons = [
    {
      link: `/${householdId}/settings/account`,
      title: "Konto",
      icon: UserIcon,
    },
    {
      link: `/${householdId}/settings/household`,
      title: "Gospodarstwo",
      icon: Home01Icon,
    },
    {
      link: `/${householdId}/settings/categories`,
      title: "Kategorie",
      icon: DashboardCircleIcon,
    },
  ];

  return (
    <div className="flex gap-2">
      {navigationButtons.map((navigation) => (
        <TopBarNavigationButton
          key={navigation.title}
          title={navigation.title}
          link={navigation.link}
          icon={navigation.icon}
          currentPath={currentPath ?? ""}
        />
      ))}
    </div>
  );
}

function TopBarNavigationButton({
  link,
  title,
  icon,
  currentPath,
}: {
  link: string;
  title: string;
  icon: typeof UserIcon;
  currentPath: string;
}) {
  const isActive =
    currentPath == link.split("/")[3] ||
    (currentPath == "" && title == "Dashboard");
  return (
    <Button
      variant={isActive ? "submit" : "ghost"}
      className="rounded-full "
      asChild
    >
      <Link href={link}>
        <HugeiconsIcon strokeWidth={3} width={20} height={20} icon={icon} />
        <p className="text-sm font-medium">{title}</p>
      </Link>
    </Button>
  );
}
