"use client";
import { Logout05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { signOut } from "next-auth/react";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

export function SignOutButton() {
  return (
    <div className="cursor-pointer self-center" onClick={() => signOut()}>
      <HugeiconsIcon
        strokeWidth={2}
        width={20}
        height={20}
        icon={Logout05Icon}
      />
    </div>
  );
}

export function SignOutButtonStretched() {
  const t = useTranslations("Settings.account");
  return (
    <Button
      variant="ghostDestructive"
      className="ring self-stretch sm:hidden"
      onClick={() => signOut()}
    >
      <HugeiconsIcon
        strokeWidth={2}
        width={20}
        height={20}
        icon={Logout05Icon}
      />
      <p>{t("signOut")}</p>
    </Button>
  );
}
