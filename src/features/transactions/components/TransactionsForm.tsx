"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { transactionType } from "@/drizzle/schema";
import { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { transactionsSchema } from "../schema/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { createTransaction } from "../actions/transactions";
import { useTranslations } from "next-intl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

const transcationFormSchema = transactionsSchema.pick({
  categoryId: true,
  date: true,
  name: true,
  price: true,
  membersIds: true,
});

type TranscationFormSchema = z.infer<typeof transcationFormSchema>;

export function TransactionForm({
  defaultTransaction,
  members,
  categories,
  householdId,
}: {
  defaultTransaction: string;
  members: {
    name: string;
    id: string;
    user: {
      id: string;
      image: string | null;
    } | null;
  }[];
  categories: {
    name: string;
    id: string;
    icon: string;
    categoryType: "fixed" | "fun" | "future you" | "incomes";
  }[];
  householdId: string;
}) {
  const ts = useTranslations("CreateTransaction");
  const session = useSession();
  const [transaction, setTransaction] = useState(defaultTransaction ?? "");

  const currentMemberId = members.find(
    (member) => member.user?.id === session.data?.user.id
  )?.id;

  const incomeCategories = categories.filter(
    (category) => category.categoryType == "incomes"
  );

  const expenseCategories = categories.filter(
    (category) => category.categoryType != "incomes"
  );

  const currentCategories =
    transaction == "income" ? incomeCategories : expenseCategories;

  const form = useForm<TranscationFormSchema>({
    resolver: zodResolver(transcationFormSchema),
    defaultValues: {
      price: 0,
      name: "",
      membersIds: currentMemberId ?? undefined,
      date: new Date(),
      categoryId: undefined,
    },
  });

  function onSubmit(data: TranscationFormSchema) {
    createTransaction({ ...data, type: transaction }, householdId);
    form.resetField("name");
    form.resetField("price");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="flex justify-center items-center gap-2 w-full sm:flex-nowrap sm:flex-row flex-col-reverse flex-wrap">
          <div className="w-full">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ts("price")}</FormLabel>
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
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel className="opacity-0">t</FormLabel>
            <div className="flex gap-2 justify-center">
              {transactionType.map((t) => (
                <Button
                  key={t}
                  className={cn(
                    "bg-card hover:bg-[#747474] text-white/20 hover:text-foreground px-3",
                    transaction == t &&
                      "bg-accent hover:bg-accent text-foreground"
                  )}
                  type="button"
                  onClick={() => setTransaction(t)}
                >
                  {ts(`transactionTypes.${t}`)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{ts("name.label")}</FormLabel>
              <FormControl>
                <Input placeholder={ts("name.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <div className="w-full">
            <FormField
              control={form.control}
              name="membersIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ts("member")}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={session.data?.user.name} />
                      </SelectTrigger>
                      <SelectContent>
                        {members.map((member) => (
                          <SelectItem value={member.id} key={member.id}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ts("dateLabel")}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button className="w-[140px]" variant="datePicker">
                          {format(field.value, "dd/MM/yyyy")}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{ts("category.label")}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={ts("category.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {currentCategories.map((category) => (
                      <SelectItem value={category.id} key={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center pt-3.5">
          <Button
            variant="submit"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {ts("submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
