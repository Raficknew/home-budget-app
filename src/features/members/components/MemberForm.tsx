"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { membersSchema, MembersSchema } from "../schema/members";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createMember, updateMember } from "../actions/members";
import { DialogFooter } from "@/components/ui/dialog";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
export function MemberForm({
  householdId,
  member,
  onSuccess,
}: {
  householdId: string;
  member?: { id: string; name: string };
  onSuccess?: () => void;
}) {
  const form = useForm<MembersSchema>({
    resolver: zodResolver(membersSchema),
    defaultValues: member ?? {
      name: "",
    },
  });

  function onSubmit(data: MembersSchema) {
    if (member) {
      updateMember(data, member.id, householdId);
      onSuccess?.();
    } else {
      createMember(data, householdId);
      form.reset();
    }
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
                    placeholder="Maciek"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button variant="submit" disabled={form.formState.isSubmitting}>
              <p className="md:flex hidden">{member ? "Zapisz" : "Dodaj"}</p>
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
