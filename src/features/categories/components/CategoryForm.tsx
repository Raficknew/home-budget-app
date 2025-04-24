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
import { CategoriesOfExpanse } from "@/drizzle/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryIcon, IconKeys, icons } from "./CategoryIcon";
import { createCategory, updateCategory } from "../actions/category";

export function CategoryForm({
  type,
  category,
  householdId,
  onSuccess,
}: {
  type: CategoriesOfExpanse;
  category?: { id: string; name: string; icon: string; type: string };
  householdId: string;
  onSuccess?: () => void;
}) {
  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: category ?? {
      name: "",
      icon: "",
      type,
    },
  });

  async function onSubmit(data: CategorySchema) {
    if (category) {
      updateCategory(data, category.id, householdId, type);
      onSuccess?.();
    } else {
      createCategory(data, householdId);
    }
    form.reset();
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input placeholder="Zakupy" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="flex">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="flex">
                      <SelectValue placeholder="Wybierz ikone" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="grid grid-cols-5">
                        {Object.keys(icons)
                          .filter((icon) => icon !== "default")
                          .map((icon) => (
                            <SelectItem value={icon} key={icon}>
                              <CategoryIcon
                                size={12}
                                categoryIconName={icon as IconKeys}
                              />
                            </SelectItem>
                          ))}
                      </div>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="submit" disabled={form.formState.isSubmitting}>
            {category ? "Save" : <PlusIcon />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
