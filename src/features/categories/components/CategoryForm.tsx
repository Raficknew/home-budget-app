"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
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
import { Spacer } from "@/components/Spacer";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const [categoryIcon, setCategoryIcon] = useState(category?.icon ?? "");
  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: category ?? {
      name: "",
      icon: categoryIcon,
      categoryType,
    },
  });

  async function onSubmit(data: CategorySchema) {
    if (categoryIcon == "") return;

    if (category) {
      updateCategory(
        { ...data, icon: categoryIcon },
        category.id,
        householdId,
        data.categoryType as CategoriesOfExpanse
      );
      onSuccess?.();
    } else {
      createCategory({ ...data, icon: categoryIcon }, householdId);
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
                    placeholder="Zakupy"
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
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz nadkategorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesOfExpanse.map((category) => (
                        <SelectItem value={category} key={category}>
                          {category}
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
          <div className="grid grid-cols-10 gap-3">
            {Object.keys(icons)
              .filter((icon) => icon !== "default")
              .map((icon) => (
                <div
                  key={icon}
                  onClick={() => setCategoryIcon(icon)}
                  className={cn(
                    "flex justify-center p-2.5 rounded-lg cursor-pointer",
                    categoryIcon == icon ? "bg-accent" : "bg-[#212122]"
                  )}
                >
                  <CategoryIcon
                    size={20}
                    categoryIconName={icon as CategoryIconKeys}
                  />
                </div>
              ))}
          </div>
          <Button
            className="text-end"
            variant="submit"
            disabled={form.formState.isSubmitting}
          >
            {category ? (
              "Zapisz"
            ) : (
              <div className="flex items-center">
                <PlusIcon />
                Dodaj
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
