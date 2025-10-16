"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  membersSchema,
  MembersSchema,
} from "@/features/members/schema/members";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createMember, updateMember } from "@/features/members/actions/members";
import { DialogFooter } from "@/components/ui/dialog";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
export function MemberForm({
  householdId,
  member,
  onSuccess,
}: {
  householdId: string;
  member?: { id: string; name: string };
  onSuccess?: () => void;
}) {
  const t = useTranslations("Settings.household.members");
  const form = useForm<MembersSchema>({
    resolver: zodResolver(membersSchema),
    defaultValues: member ?? {
      name: "",
    },
  });

  async function onSubmit(data: MembersSchema) {
    const action = member
      ? await updateMember(data, member.id, householdId)
      : await createMember(data, householdId);

    if (action.error) {
      toast.error(action.message);
      return;
    }

    onSuccess?.();
    toast.success(action.message);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex md:flex-col gap-2 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    className="bg-[#161616]"
                    placeholder={t("placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button variant="submit" disabled={form.formState.isSubmitting}>
              <p className="md:flex hidden">
                {member ? t("save") : t("submit")}
              </p>
              <HugeiconsIcon
                className="cursor-pointer sm:size-6 size-5 md:hidden"
                icon={PlusSignIcon}
              />
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
