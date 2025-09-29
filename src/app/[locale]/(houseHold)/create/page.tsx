import { HozzyLogo } from "@/components/atoms/HozzyLogo";
import { PageTitle } from "@/components/atoms/PageTitle";
import { HouseholdForm } from "@/features/household/components/HouseholdGeneralForm";
import { getCurrencies } from "@/global/functions";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function HouseholdCreateFormPage() {
  const currencies = await getCurrencies();
  const t = await getTranslations("CreateHousehold");

  return (
    <div className="flex justify-center h-screen items-center px-2 ">
      <Link href="/">
        <HozzyLogo />
      </Link>
      <div className="flex flex-col gap-3 w-[390px] text-center">
        <PageTitle title={t("title")} subtitle={t("subtitle")} />
        <HouseholdForm currencies={currencies} />
      </div>
    </div>
  );
}
