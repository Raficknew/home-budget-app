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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
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
import { PopoverClose } from "@radix-ui/react-popover";

const transcationFormSchema = transactionsSchema.pick({
  categoryId: true,
  date: true,
  name: true,
  price: true,
  membersIds: true,
});

type TranscationFormSchema = z.infer<typeof transcationFormSchema>;

type Member = {
  name: string | null;
  id: string;
  user: { name: string | null; id: string } | null;
};

type Category = {
  id: string;
  name: string;
};

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
  const [transaction, setTransaction] = useState(defaultTransaction ?? "");
  const form = useForm<TranscationFormSchema>({
    resolver: zodResolver(transcationFormSchema),
    defaultValues: {
      price: 0,
      name: "",
      membersIds: members[0]?.id,
      date: new Date(),
      categoryId: "",
    },
  });

  function onSubmit(data: TranscationFormSchema) {
    createTransaction({ ...data, type: transaction }, householdId);
    form.resetField("name");
    form.resetField("price");
  }

  const handleTransactionTypeChange = (type: string) => {
    setTransaction(type);
  };

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
                  <FormLabel>Kwota</FormLabel>
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
                <TransactionType
                  className={
                    transaction == t
                      ? "bg-accent hover:bg-accent text-foreground"
                      : ""
                  }
                  change={
                    transaction !== t ? handleTransactionTypeChange : () => {}
                  }
                  key={t}
                  title={t}
                />
              ))}
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa</FormLabel>
              <FormControl>
                <Input placeholder="Wpisz nazwę" {...field} />
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
                  <FormLabel>Konto</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={members[0]?.user?.name} />
                      </SelectTrigger>
                      <SelectContent>
                        {members.map((member) => (
                          <SelectItem value={member.id} key={member.id}>
                            {member.user?.name ?? member.name}
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
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button className="w-[140px]" variant="datePicker">
                          {dayjs(field.value).format("DD/MM/YYYY")}
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
              <FormLabel>Kategoria</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Wybierz" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
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
          <Button variant="submit" type="submit">
            Dodaj
          </Button>
        </div>
      </form>
    </Form>
  );
}

function TransactionType({
  title,
  change,
  className,
}: {
  title: string;
  change: (t: string) => void;
  className?: string;
}) {
  return (
    <Button
      className={cn(
        "bg-card hover:bg-[#747474] text-white/20 hover:text-foreground px-3",
        className
      )}
      type="button"
      onClick={() => change(title)}
    >
      {title}
    </Button>
  );
}
