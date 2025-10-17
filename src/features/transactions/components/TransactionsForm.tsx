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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  TransactionsSchema,
  transactionsSchema,
} from "@/features/transactions/schema/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { createTransaction } from "@/features/transactions/actions/transactions";
import { useTranslations } from "next-intl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { Member } from "@/features/members/components/Member";
import { Category } from "@/global/types";
import { LoadingSwap } from "@/components/atoms/LoadingSwap";
import { toast } from "sonner";

export function TransactionForm({
  defaultTransaction,
  members,
  categories,
  householdId,
}: {
  defaultTransaction: string;
  members: Member[];
  categories: Category[];
  householdId: string;
}) {
  const ts = useTranslations("CreateTransaction");
  const session = useSession();
  const [transaction, setTransaction] = useState(defaultTransaction ?? "");

  const currentMember = members.find(
    (member) => member.user?.id === session.data?.user.id
  );

  const incomeCategories = categories.filter(
    (category) => category.categoryType == "incomes"
  );

  const expenseCategories = categories.filter(
    (category) => category.categoryType != "incomes"
  );

  const currentCategories =
    transaction == "income" ? incomeCategories : expenseCategories;

  const form = useForm<TransactionsSchema>({
    resolver: zodResolver(transactionsSchema),
    defaultValues: {
      price: 0,
      name: "",
      type: transaction,
      memberId: currentMember?.id ?? undefined,
      date: new Date(),
      categoryId: undefined,
    },
  });

  async function onSubmit(data: TransactionsSchema) {
    const action = await createTransaction(
      { ...data, type: transaction },
      householdId
    );

    if (action.error) {
      toast.error(action.message);
      return;
    }

    toast.success(action.message);
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
                      min={0}
                      type="number"
                      step="0.01"
                      {...field}
                      onFocus={(e) => {
                        if (
                          e.target.value === "0.00" ||
                          e.target.value === "0"
                        ) {
                          e.target.value = "";
                        }
                      }}
                      onBlur={(e) => {
                        const value = e.target.value.replace(",", ".");
                        e.target.value = Number(value).toFixed(2);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="opacity-0">t</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 justify-center">
                      {transactionType.map((t) => (
                        <Button
                          key={t}
                          className={cn(
                            "bg-card hover:bg-[#747474] text-white/20 hover:text-foreground px-3",
                            (field.value ?? transaction) === t &&
                              "bg-accent hover:bg-accent text-foreground"
                          )}
                          type="button"
                          onClick={() => {
                            setTransaction(t);
                            field.onChange(t);
                          }}
                        >
                          {ts(`transactionTypes.${t}`)}
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="memberId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ts("member")}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={currentMember?.name} />
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
            <LoadingSwap isLoading={form.formState.isSubmitting}>
              {ts("submit")}
            </LoadingSwap>
          </Button>
        </div>
      </form>
    </Form>
  );
}
