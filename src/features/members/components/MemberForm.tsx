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
          className="flex flex-col gap-2 w-full"
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

          <DialogFooter>
            <Button variant="submit" disabled={form.formState.isSubmitting}>
              {member ? "Zapisz" : "Dodaj"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
