"use client";

import { z } from "zod";
import { householdSchema } from "../schema/households";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const householdBalanceFormSchema = householdSchema.pick({
  balance: true,
});

type HouseholdBalanceFormSchema = z.infer<typeof householdBalanceFormSchema>;

export function HouseholdBalanceForm() {
  const locale = useLocale();
  const router = useRouter();
  const form = useForm<HouseholdBalanceFormSchema>({
    resolver: zodResolver(householdBalanceFormSchema),
    defaultValues: {
      balance: 0,
    },
  });

  function onSubmit(data: HouseholdBalanceFormSchema) {
    data.balance = +data.balance;
    console.log(data);
    router.push(`/${locale}/create/members`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grow w-full space-y-8 text-left"
      >
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input
                  onClick={(e) => {
                    if (+(e.target as HTMLInputElement).value == 0) {
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                  min={0}
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="submit" type="submit">
          Next
        </Button>
      </form>
    </Form>
  );
}
