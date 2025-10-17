"use client";
import { ComponentPropsWithRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
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
import { LoadingSwap } from "@/components/atoms/LoadingSwap";
import { toast } from "sonner";

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
      const performingAction = await action();

      if (performingAction.error) {
        toast.error(performingAction.message);
        return;
      }

      toast.success(performingAction.message);
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
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
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
