"use client";
import { Logout05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export function SignOutButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer self-center">
        <HugeiconsIcon
          strokeWidth={2}
          width={20}
          height={20}
          icon={Logout05Icon}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Czy na pewno chcesz się{" "}
            <span className="text-red-400">wylogować</span>?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction onClick={() => signOut()}>
            Potwierdź
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function SignOutButtonStretched() {
  const t = useTranslations("Settings.account");
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full sm:hidden">
        <div
          className={cn(
            "ring w-full",
            buttonVariants({ variant: "ghostDestructive" })
          )}
        >
          <HugeiconsIcon
            strokeWidth={2}
            width={20}
            height={20}
            icon={Logout05Icon}
          />
          <p>{t("signOut")}</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Czy na pewno chcesz się{" "}
            <span className="text-red-400">wylogować</span>?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction onClick={() => signOut()}>
            Potwierdź
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
