import { AnimateButton } from "@/components/atoms/Animations/AnimateButton";
import { AnimateImage } from "@/components/atoms/Animations/AnimateImage";
import { AnimateText } from "@/components/atoms/Animations/AnimateText";
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
    <div className="h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <HozzyLogo />
      <LanguageSelect
        currentLocale={locale}
        className="fixed top-18 sm:top-7.5 sm:right-8"
      />

      <div className="flex flex-col items-center justify-between h-full pt-40 xl:w-[1280px] lg:w-[1024px] md:w-[768px] sm:w-[540px] w-full px-3">
        <div className="flex flex-col xl:text-6xl lg:text-5xl md:text-4xl sm:text-2xl text-xl font-semibold sm:text-start text-center">
          <AnimateText
            className="text-[#BDB6FC]"
            title={t("firstTerm")}
            transition={{ delay: 0.1, ease: "easeOut" }}
          />
          <AnimateText
            className="sm:self-start self-center sm:indent-15 bg-gradient-to-r from-[#7047EB] to-[#BDB6FC] bg-clip-text text-transparent w-fit inline-block leading-[1.4] align-text-bottom"
            title={t("secondTerm")}
            transition={{ delay: 0.3, ease: "easeOut" }}
          />
          <div className="flex flex-col sm:gap-2 gap-4">
            <AnimateText
              className="text-[#7047EB] sm:indent-30"
              title={t("thirdTerm")}
              transition={{ delay: 0.5, ease: "easeOut" }}
            />

            <div className="sm:text-end text-center flex flex-col sm:gap-2 gap-4 lg:text-base md:text-sm text-xs font-normal">
              <AnimateText
                className="texh2t-white/70"
                transition={{ delay: 0.7, ease: "easeOut" }}
                title={t("description")}
              />

              <AnimateButton className="flex sm:self-end">
                <Link
                  className={cn(buttonVariants({ variant: "submit" }))}
                  href={`/${locale}/sign-in`}
                >
                  {t("join")}
                  <HugeiconsIcon strokeWidth={3} icon={ArrowRight01Icon} />
                </Link>
              </AnimateButton>
            </div>
          </div>
        </div>

        <div className="relative hidden md:flex justify-center items-end w-full">
          <AnimateImage
            className="absolute left-20 bottom-0 z-0 xl:w-[800px] lg:w-[600px] md:w-[450px] max-h-[60vh]"
            transition={{ delay: 0.5 }}
          >
            <Image
              src="/images/HozzyTransactionImage.svg"
              alt="TransactionChart"
              width={800}
              height={800}
              style={{ maxHeight: "60vh", height: "auto" }}
            />
          </AnimateImage>
          <AnimateImage
            className="relative z-10 xl:w-[500px] lg:w-[400px] md:w-[300px] max-h-[50vh]"
            transition={{ delay: 0.7 }}
          >
            <Image
              src="/images/HozzyBalanceImage.svg"
              alt="Balance"
              width={500}
              height={500}
              style={{ maxHeight: "50vh", height: "auto" }}
            />
          </AnimateImage>
          <AnimateImage
            className="absolute right-15 bottom-0 z-5 xl:w-[700px] lg:w-[500px] md:w-[400px] max-h-[55vh]"
            transition={{ delay: 0.9 }}
          >
            <Image
              src="/images/HozzyIncomeChart.svg"
              alt="IncomeChart"
              width={700}
              height={700}
              style={{ maxHeight: "55vh", height: "auto" }}
            />
          </AnimateImage>
          <AnimateImage
            className="fixed bottom-0 -z-10"
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
          >
            <Image
              src="/images/HozzyCircle.svg"
              alt="circle"
              width={1500}
              height={1500}
            />
          </AnimateImage>
        </div>
      </div>
    </div>
  );
}
