"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useTranslations } from "next-intl";
import { createHousehold } from "../actions/household";
import { householdSchema, HouseholdSchema } from "../schema/household";

export function HouseholdForm({
  currencies,
}: {
  currencies: { code: string }[];
}) {
  const t = useTranslations("CreateHousehold");

  const form = useForm<HouseholdSchema>({
    resolver: zodResolver(householdSchema),
    defaultValues: {
      name: "",
      description: "",
      currencyCode: "",
      balance: 0,
    },
  });

  function onSubmit(data: HouseholdSchema) {
    createHousehold(data);
  }

  return (
    <>
      <h1 className="text-2xl">{t("title")}</h1>
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
                <FormLabel>{t("name.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("name.placeholder")} {...field} />
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
                <FormLabel>{t("description.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("description.placeholder")}
                    {...field}
                  />
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
                <FormLabel>{t("currency.label")}</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t("currency.placeholder")} />
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
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("balance.label")}</FormLabel>
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
            {t("submit")}
          </Button>
        </form>
      </Form>
    </>
  );
}
