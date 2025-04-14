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
import { createMember } from "../actions/members";

export function MemberAdd({ householdId }: { householdId: string }) {
  const form = useForm<MembersSchema>({
    resolver: zodResolver(membersSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: MembersSchema) {
    createMember(data, householdId);
    form.reset();
  }

  return (
    <div className="flex ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full">
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
          <Button variant="submit">
            <PlusIcon />
          </Button>
        </form>
      </Form>
    </div>
  );
}
