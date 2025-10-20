"use client";
import { useForm } from "react-hook-form";
import { usersSchema, UsersSchema } from "@/features/users/schema/users";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "next-auth";
import { updateUser } from "@/features/users/actions/users";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { LoadingSwap } from "@/components/atoms/LoadingSwap";
import { useTransition } from "react";
import { performFormSubmitAction } from "@/global/functions";

export function UserForm({ user }: { user: User }) {
  if (!user) notFound();

  const t = useTranslations("Settings.account");
  const [isPending, startTransition] = useTransition();

  const form = useForm<UsersSchema>({
    resolver: zodResolver(usersSchema),
    defaultValues: {
      name: user.name ?? "",
    },
  });

  async function onSubmit(data: UsersSchema) {
    if (!user) return;

    startTransition(async () => {
      await performFormSubmitAction(() => updateUser(data, user.id!));
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full flex flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("label")}</FormLabel>
              <FormControl>
                <Input className="bg-[#161616]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="self-end w-full sm:w-fit"
          variant="submit"
          type="submit"
          disabled={form.formState.isSubmitting || isPending}
        >
          <LoadingSwap isLoading={form.formState.isSubmitting || isPending}>
            {t("save")}
          </LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
