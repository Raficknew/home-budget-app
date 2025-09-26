import { HouseholdForm } from "@/features/household/components/HouseholdGeneralForm";
import { getCurrencies } from "@/global/functions";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function HouseholdCreateFormPage() {
  const currencies = await getCurrencies();
  const t = await getTranslations("CreateHousehold");

  return (
    <div className="flex justify-center h-screen items-center px-2 ">
      <Link href="/">
        <Image
          className="fixed top-8 sm:left-8"
          src="/images/HozzyLogo.svg"
          alt="logo"
          width={90}
          height={90}
        />
      </Link>
      <div className="flex flex-col gap-3 w-[390px] text-center">
        <h1 className="text-3xl font-semibold">{t("title")}</h1>
        <p className="font-normal text-white/80">{t("subtitle")}</p>
        <HouseholdForm currencies={currencies} />
      </div>
    </div>
  );
}
