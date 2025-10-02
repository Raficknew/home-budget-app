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

      <div className="flex flex-col items-center justify-between h-full pt-50 xl:w-[1280px] lg:w-[1024px] md:w-[768px] sm:w-[540px] w-full px-3">
        <div className="flex flex-col xl:text-6xl lg:text-5xl md:text-4xl sm:text-2xl text-xl font-semibold sm:text-start text-center">
          <h1 className="text-[#BDB6FC]">{t("firstTerm")}</h1>
          <h1 className="sm:self-start self-center sm:indent-15 bg-gradient-to-r from-[#7047EB] to-[#BDB6FC] bg-clip-text text-transparent w-fit inline-block leading-[1.4] align-text-bottom">
            {t("secondTerm")}
          </h1>
          <div className="flex flex-col sm:gap-2 gap-4">
            <h1 className="text-[#7047EB] sm:indent-30">{t("thirdTerm")}</h1>
            <div className="sm:text-end text-center flex flex-col sm:gap-2 gap-4 lg:text-base md:text-sm text-xs font-normal">
              <h2 className="text-white/70">{t("description")}</h2>
              <Link
                className={cn(
                  "sm:self-end",
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
