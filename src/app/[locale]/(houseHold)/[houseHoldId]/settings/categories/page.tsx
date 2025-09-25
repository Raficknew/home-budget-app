import { MobileTopHeader } from "@/components/atoms/MobileTopHeader";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { CategoryList } from "@/features/categories/components/CategoryList";
import { getCategories } from "@/global/functions";
import { getTranslations } from "next-intl/server";

export default async function HouseholdCategorySettingsPage({
  params,
}: {
  params: Promise<{ houseHoldId: string }>;
}) {
  const { houseHoldId } = await params;
  const categories = await getCategories(houseHoldId);
  const t = await getTranslations("Settings.categories");

  return (
    <>
      <MobileTopHeader title={t("mobileTitle")}>
        <div className="w-10"></div>
      </MobileTopHeader>
      <div className="flex flex-col sm:gap-10 gap-4">
        <SectionHeader title={t("title")} description={t("description")} />
        <CategoryList categories={categories} householdId={houseHoldId} />
      </div>
    </>
  );
}
