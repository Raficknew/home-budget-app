import { HouseholdForm } from "@/features/household/components/HouseholdGeneralForm";
import { getCurrencies } from "@/global/functions";
import { getTranslations } from "next-intl/server";

export default async function HouseholdGeneralInfoFormPage() {
  const currencies = await getCurrencies();
  const t = await getTranslations("CreateHousehold");
  return (
    <div className="py-2">
      <h1 className="text-2xl">{t("title")}</h1>
      <HouseholdForm currencies={currencies} />;
    </div>
  );
}
