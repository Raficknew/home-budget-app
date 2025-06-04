"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { categorySchema, CategorySchema } from "../schema/category";
import {
  categoriesOfExpanse,
  CategoriesOfExpanse,
  CategoryTable,
} from "@/drizzle/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryIcon, CategoryIconKeys, icons } from "./CategoryIcon";
import { createCategory, updateCategory } from "../actions/category";
import { Spacer } from "@/components/atoms/Spacer";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function CategoryForm({
  categoryType,
  category,
  householdId,
  onSuccess,
}: {
  categoryType: CategoriesOfExpanse;
  category?: typeof CategoryTable.$inferSelect;
  householdId: string;
  onSuccess?: () => void;
}) {
  const t = useTranslations("Settings.categories");
  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: category ?? {
      name: "",
      icon: "",
      categoryType,
    },
  });

  async function onSubmit(data: CategorySchema) {
    if (category) {
      updateCategory(
        data,
        category.id,
        householdId,
        data.categoryType as CategoriesOfExpanse
      );
      onSuccess?.();
    } else {
      createCategory(data, householdId);
      onSuccess?.();
    }
    form.reset();
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    className="bg-[#212122]"
                    placeholder={t("placeholders.name")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full bg-[#212122]">
                      <SelectValue placeholder="Wybierz nadkategorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesOfExpanse.map((type) => (
                        <SelectItem value={type} key={type}>
                          {t(`types.${type}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Spacer color="bg-white" />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="grid sm:grid-cols-10 grid-cols-5 gap-3">
                    {Object.keys(icons)
                      .filter((icon) => icon !== "default")
                      .map((icon) => (
                        <div
                          key={icon}
                          onClick={() => {
                            form.setValue("icon", icon);
                          }}
                          className={cn(
                            "flex justify-center p-2 rounded-lg cursor-pointer",
                            field.value == icon ? "bg-accent" : "bg-[#212122]"
                          )}
                        >
                          <CategoryIcon
                            size={20}
                            categoryIconName={icon as CategoryIconKeys}
                          />
                        </div>
                      ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-fit self-end" variant="submit">
            {category ? t("save") : t("submit")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
