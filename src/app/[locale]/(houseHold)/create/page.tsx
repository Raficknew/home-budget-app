import { HouseholdForm } from "@/features/household/components/HouseholdGeneralForm";
import { getCurrencies } from "@/global/functions";

export default async function HouseholdGeneralInfoFormPage() {
  const currencies = await getCurrencies();
  return <HouseholdForm currencies={currencies} />;
}
