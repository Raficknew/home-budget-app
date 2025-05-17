"use client";
import { ComponentPropsWithRef, ReactNode, useTransition } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

export function ActionButton({
  action,
  requireAreYouSure = false,
  ...props
}: Omit<ComponentPropsWithRef<typeof Button>, "onClick"> & {
  requireAreYouSure?: boolean;
  action: () => Promise<{ error: boolean; message: string }>;
}) {
  const [isLoading, startTransition] = useTransition();
  const t = useTranslations("AreYouSureDialog");

  function performAction() {
    startTransition(async () => {
      await action();
    });
  }

  if (requireAreYouSure) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button {...props} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("title")}</AlertDialogTitle>
            <AlertDialogDescription>{t("description")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="grid grid-cols-2">
            <AlertDialogCancel className="cursor-pointer">
              {t("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction disabled={isLoading} onClick={performAction}>
              <LoadingSwap isLoading={isLoading}>{t("proceed")}</LoadingSwap>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Button {...props} disabled={isLoading} onClick={performAction}>
      <LoadingSwap isLoading={isLoading}>{props.children}</LoadingSwap>
    </Button>
  );
}

function LoadingSwap({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid items-center justify-items-center cursor-pointer">
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2",
          isLoading ? "invisible" : "visible"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2 text-center",
          isLoading ? "visible" : "invisible"
        )}
      >
        <Loader2Icon className="animate-spin" />
      </div>
    </div>
  );
}
