import { Category } from "@/features/categories/components/Category";
import { CategoryForm } from "@/features/categories/components/CategoryForm";
import { CategoryIconKeys } from "@/features/categories/components/CategoryIcon";
import { getCategories } from "@/global/functions";

export default async function HouseholdCategorySettingsPage({
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const { householdId } = await params;
  const categories = await getCategories(householdId);
  return (
    <div>
      <div>
        <CategoryForm householdId={householdId} type="fun" />
      </div>
      <div>
        {categories.map((category) => (
          <Category
            key={category.id}
            category={{
              ...category,
              icon: category.icon as CategoryIconKeys,
            }}
            householdId={householdId}
          />
        ))}
      </div>
    </div>
  );
}
