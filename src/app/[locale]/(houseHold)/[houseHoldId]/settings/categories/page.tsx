import { MobileTopHeader } from "@/components/MobileTopHeader";
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
    <>
      <MobileTopHeader title="EDYTUJ KATEGORIE">
        <div className="w-10"></div>
      </MobileTopHeader>
      <div className="flex flex-col sm:gap-10 gap-4">
        <SectionHeader
          title="Kategorie"
          description="Dodawaj, usuwaj i edytuj kategorie"
        />
        <CategoryList categories={categories} householdId={householdId} />
      </div>
    </>
  );
}
