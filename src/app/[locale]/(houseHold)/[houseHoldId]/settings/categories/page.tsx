import { SectionHeader } from "@/components/SectionHeader";
import { CategoryList } from "@/features/categories/components/CategoryList";
import { getCategories } from "@/global/functions";

export default async function HouseholdCategorySettingsPage({
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const { householdId } = await params;
  const categories = await getCategories(householdId);

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title="Kategorie"
        description="Dodawaj, usuwaj i edytuj kategorie"
      />
      <div>
        <CategoryList categories={categories} householdId={householdId} />
      </div>
    </div>
  );
}
