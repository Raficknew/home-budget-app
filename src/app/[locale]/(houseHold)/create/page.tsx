import { HouseHoldForm } from "@/features/houseHold/components/HouseholdGeneralForm";
import { getCurrencies } from "@/global/functions";

export default async function GeneralInfoHouseHoldPage() {
  const currencies = await getCurrencies();
  return <HouseHoldForm currencies={currencies} />;
}
