import { HozzyLogo } from "@/components/atoms/HozzyLogo";
import { LanguageSelect } from "@/components/atoms/LanguageSelect";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function HeroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("HeroPage");

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <HozzyLogo />
      <LanguageSelect
        currentLocale={locale}
        className="fixed top-18 sm:top-7.5 sm:right-8"
      />

      <div className="flex flex-col items-center justify-between h-full pt-50 xl:w-[1280px] lg:w-[1024px] md:w-[768px] sm:w-[540px]">
        <div className="flex flex-col xl:text-7xl lg:text-5xl md:text-4xl font-semibold">
          <h1 className="text-[#BDB6FC]">{t("firstTerm")}</h1>
          <h1 className="indent-15 bg-gradient-to-r from-[#7047EB] to-[#BDB6FC] bg-clip-text text-transparent w-fit inline-block leading-[1.4] align-text-bottom">
            {t("secondTerm")}
          </h1>
          <div className="flex flex-col gap-2">
            <h1 className="text-[#7047EB] indent-30">{t("thirdTerm")}</h1>
            <div className="text-end flex flex-col gap-2 lg:text-base md:text-sm font-normal">
              <h2 className="text-white/70">{t("description")}</h2>
              <Link
                className={cn(
                  "self-end",
                  buttonVariants({ variant: "submit" })
                )}
                href={`/${locale}/sign-in`}
              >
                {t("join")}
                <HugeiconsIcon strokeWidth={3} icon={ArrowRight01Icon} />
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <Image
            src="/images/HozzyHeroImage.svg"
            alt="image"
            width={1280}
            height={1280}
          />
        </div>
      </div>
    </div>
  );
}
