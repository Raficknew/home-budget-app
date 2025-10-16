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
import { toast } from "sonner";

export function UserForm({
  user,
}: {
  user:
    | ({
        google_mail: string;
        _permissions: {
          isAuthorized: boolean;
        };
      } & User)
    | undefined;
}) {
  if (!user?.name || !user.id || !user) notFound();
  const t = useTranslations("Settings.account");
  const form = useForm<UsersSchema>({
    resolver: zodResolver(usersSchema),
    defaultValues: {
      name: user.name,
    },
  });

  async function onSubmit(data: UsersSchema) {
    if (!user || !user.id) return;

    const result = await updateUser(data, user.id);

    if (result.error) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
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
          disabled={form.formState.isSubmitting}
        >
          {t("save")}
        </Button>
      </form>
    </Form>
  );
}
