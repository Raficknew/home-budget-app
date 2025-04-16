"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
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
import { cn } from "@/lib/utils";

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
          className={cn("w-full", member == null && "flex")}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input placeholder="Maciek" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {member ? (
            <DialogFooter className="mt-4">
              <Button variant="submit" disabled={form.formState.isSubmitting}>
                Zapisz
              </Button>
            </DialogFooter>
          ) : (
            <Button variant="submit" disabled={form.formState.isSubmitting}>
              <PlusIcon />
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
