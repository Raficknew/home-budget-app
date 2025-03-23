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
import { useTranslations } from "next-intl";

export function HouseHoldForm({
  currencies,
  locale,
}: {
  currencies: { code: string }[];
  locale: string;
}) {
  const t = useTranslations("CreateHouseHold");
  const form = useForm<z.infer<typeof houseHoldSchema>>({
    resolver: zodResolver(houseHoldSchema),
    defaultValues: {
      name: "",
      description: "",
      currencyCode: "",
    },
  });

  async function onSubmit(data: z.infer<typeof houseHoldSchema>) {
    await insertHouseHold(data, locale);
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
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("namePlaceholder")} {...field} />
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
                <FormLabel>{t("description")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("descriptionPlaceholder")} {...field} />
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
                <FormLabel>{t("currency")}</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t("currencyPlaceholder")} />
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
            {t("submit")}
          </Button>
        </form>
      </Form>
    </>
  );
}
