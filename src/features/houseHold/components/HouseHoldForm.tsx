"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { houseHoldSchema } from "../schema/houseHolds";
import { insertHouseHold } from "../actions/houseHolds";

export function HouseHoldForm({
  currencies,
}: {
  currencies: { code: string }[];
}) {
  const form = useForm<z.infer<typeof houseHoldSchema>>({
    resolver: zodResolver(houseHoldSchema),
    defaultValues: {
      name: "",
      description: "",
      currencyCode: "",
    },
  });

  async function onSubmit(data: z.infer<typeof houseHoldSchema>) {
    await insertHouseHold(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grow w-full space-y-8 text-left"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa</FormLabel>
              <FormControl>
                <Input
                  placeholder="Wpisz nazwę dla nowego gospodarstwa"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis</FormLabel>
              <FormControl>
                <Input placeholder="Wpisz opis dla gospodarstwa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currencyCode"
          render={({ field }) => (
            <FormItem className="flex">
              <FormLabel>Waluta</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Wybierz walutę" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="submit" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
