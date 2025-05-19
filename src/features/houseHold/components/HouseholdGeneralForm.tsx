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
import { createHousehold, updateHousehold } from "../actions/household";
import { householdSchema, HouseholdSchema } from "../schema/household";

export function HouseholdForm({
  currencies,
  household,
}: {
  currencies: { code: string }[];
  household?: {
    id: string;
    name: string;
    description: string;
    currencyCode: string;
    balance: number;
  };
}) {
  const t = useTranslations("CreateHousehold");

  const form = useForm<HouseholdSchema>({
    resolver: zodResolver(householdSchema),
    defaultValues: household ?? {
      name: "",
      description: "",
      currencyCode: "",
      balance: 0,
    },
  });

  function onSubmit(data: HouseholdSchema) {
    if (household != null) {
      updateHousehold(data, household.id);
    } else {
      createHousehold(data);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grow w-full sm:space-y-8 space-y-4 text-right"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name.label")}</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-[#161616]"
                  placeholder={t("name.placeholder")}
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
              <FormLabel>{t("description.label")}</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-[#161616]"
                  placeholder={t("description.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {household == null && (
          <>
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
                      className="dark:bg-[#161616]"
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
          </>
        )}
        <Button
          variant="submit"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {household ? t("save") : t("submit")}
        </Button>
      </form>
    </Form>
  );
}
