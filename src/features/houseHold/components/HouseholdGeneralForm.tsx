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
import {
  createHousehold,
  updateHousehold,
} from "@/features/household/actions/household";
import {
  householdSchema,
  HouseholdSchema,
} from "@/features/household/schema/household";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTransition } from "react";
import { LoadingSwap } from "@/components/atoms/LoadingSwap";

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
  const [isPending, startTransition] = useTransition();

  const form = useForm<HouseholdSchema>({
    resolver: zodResolver(householdSchema),
    defaultValues: household ?? {
      name: "",
      description: "",
      currencyCode: "",
      balance: 0,
    },
  });

  async function onSubmit(data: HouseholdSchema) {
    if (household != null) {
      startTransition(async () => {
        const result = await updateHousehold(data, household.id);

        if (result.error) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message);
      });

      return;
    }

    startTransition(async () => {
      await createHousehold(data);
    });

    toast.success(t("success"));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grow w-full space-y-4 text-right"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name.label")}</FormLabel>
              <FormControl>
                <Input
                  className={household && "bg-[#161616]"}
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
                  className={household && "bg-[#161616]"}
                  placeholder={t("description.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {household == null && (
          <div className="flex flex-col sm:flex-row gap-4">
            <FormField
              control={form.control}
              name="currencyCode"
              render={({ field }) => (
                <FormItem className="w-full sm:w-[155px]">
                  <FormLabel>{t("currency.label")}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full sm:w-[155px]">
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
                <FormItem className="w-full">
                  <FormLabel>{t("balance.label")}</FormLabel>
                  <FormControl>
                    <Input
                      min={0}
                      type="number"
                      step="0.01"
                      {...field}
                      onFocus={(e) => {
                        if (e.target.value === "0") {
                          e.target.value = "";
                        }
                      }}
                      onBlur={(e) => {
                        const value = e.target.value.replace(",", ".");
                        e.target.value = Number(value).toFixed(2);
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <Button
          variant="submit"
          className={cn("mt-2", household ? "" : "w-full")}
          type="submit"
          disabled={form.formState.isSubmitting || isPending}
        >
          <LoadingSwap isLoading={form.formState.isSubmitting || isPending}>
            {household ? t("save") : t("submit")}
          </LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
